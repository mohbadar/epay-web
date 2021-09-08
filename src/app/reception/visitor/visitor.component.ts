import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DisplayPhotoComponent } from '../visit/display-photo/display-photo.component';
// import { VisitService } from '../visit/visit.service';
import {VisitorService} from './visitor.service';
@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
	@ViewChild('tableRowDetails') tableRowDetails: any;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
    tableOptions;
    tblMsgs;
    columns;
    dataLoadingFlag: boolean;
    rows: any[];
    recordsTotal: number;
    toBeDeletedRecordId: any;
    successMsg: any;
    pageLengths;
    cssClasses;

    filterForm: FormGroup;
    viewRecordInModal: any = true;
    isCollapsed: boolean = false;
    showFilterForm: boolean;

	filters;

	loading = false;

	constructor(private cdref: ChangeDetectorRef, public translate: TranslateService,
		private spinner: NgxSpinnerService,
		private router: Router,
		private fb: FormBuilder, private dtService: DatatablesService,
		private sysRegService: SystemRegistryService, private visitorService: VisitorService,
		private modalService: NgbModal,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService) { }

	ngOnInit(): void {
		this.filters = null;
		this.pageLengths = this.dtService.pageLengths;
		this.cssClasses = this.dtService.cssClasses;
		this.tblMsgs = this.dtService.getTableMsgs();

		this.tableOptions = this.testTableOptions();
		this.columns = this.dtService.getColumnsArray(this.tableOptions);
		// this.createFilterForm();
		this.renderData(this.tableOptions, this.filters);
	}

	renderData(tableOptions, filters) {
		// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
		this.dataLoadingFlag = true;
		this.spinner.show();
		this.visitorService.getRecordList(tableOptions, filters).subscribe((data:any) => {
			if (data == null) {
				this.rows = [];
				this.recordsTotal = 0;
			} else {
				console.log("data from server ", data.data);
				console.log(data);
				this.spinner.hide();

				this.rows = this.dtService.parseDatatableData(this, tableOptions, data.data);
                // this.rows = data.data;
				// this.rows = this.dtService.parseDatatableData(this,tableOptions,data.results)
				this.recordsTotal = data.recordsTotal;
			}

			this.cdref.detectChanges();
			this.dataLoadingFlag = false;
		}, (err) => {
			this.spinner.hide();
			console.log('data error: ', err);
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
			this.cdref.detectChanges();
		});
	}

	reload() {
		this.renderData(this.tableOptions, this.filters);
	}

	setPage(pageInfo) {
		this.tableOptions.draw = pageInfo.offset + 1;
		let start = (this.tableOptions.draw * this.tableOptions.length) - this.tableOptions.length;
		this.tableOptions['start'] = start;
		this.renderData(this.tableOptions, this.filters);
	}

	setPageLength(value) {
		console.log(value);
		this.tableOptions.length = Number(value);
		this.renderData(this.tableOptions, this.filters);
	}

	toggleFilters() {
        this.isCollapsed = !this.isCollapsed;
	}

	createFilterForm() {
        this.filterForm = this.fb.group({

        });
	}

	/**
	 * rowDetailsToggleExpand
	 *
	 * @param row
	 */
	rowDetailsToggleExpand(row) {
	this.tableRowDetails.rowDetail.toggleExpandRow(row);
	}

	applyFilter() {
        let cols: DataTableColumn[] = this.tableOptions.columns;
        let newCols: any;
        let filterValues = this.filterForm.value;
        console.log('Data: ', filterValues);
        console.log('Columns: ', cols);

        newCols = cols.map((col) => {
            col.search = { value: '', regex: false };
            col.searchable = false;

            for (let key in filterValues) {
                if (col.name.toLowerCase() == key && filterValues[key]) {
                    col.search = { value: filterValues[key], regex: true };
                    col.searchable = true;
                }
            }
            return col;
        });
        console.log('data columns: ', newCols);

        this.tableOptions.columns = newCols;
        this.renderData(this.tableOptions, this.filters);
    }

    resetFilters() {
        this.filterForm.reset();
        this.applyFilter();
	}

	searchColumn(searchTerm, index) {
		this.tableOptions = this.dtService.searchColumn(this.tableOptions, index, searchTerm);
		this.renderData(this.tableOptions, this.filters);
	}

	orderColumn(columnOptions, index) {
        if (columnOptions['orderable'] == true) {
            this.tableOptions = this.dtService.orderColumn(this.tableOptions, index);
            this.renderData(this.tableOptions, this.filters);
        }
	}

	addNewRecord() {
		this.router.navigate(['reception/visits/add']);
		this.loading = true;
	}

	editRecord() {
		this.loading = true;
	}

	deleteRecord() {
		this.loading = true;
	}

	displayPhoto(visitorId) {
		console.log("clicked to display photo");
		const modalRef = this.modalService.open(DisplayPhotoComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});
		
		let url = 'api/public/visitor/' + visitorId + '/photo'
		
		modalRef.componentInstance.photoURL = url;
	}

	testTableOptions() {
		return {
			"draw": 1,
			"columns": [
				{
					"data": "vor.id", "name": "ID",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "vor.first_name", "name": "FIRST_NAME",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "vor.last_name", "name": "LAST_NAME",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "vor.father_name", "name": "FATHER_NAME",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "vor.phone_no", "name": "PHONE_NO",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false },

				},
				{
					"data": "vor.email", "name": "EMAIL",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false },

				},
				{
					"data": "v.visit_date", "name": "VISIT_DATE",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false },

				},
				{
					"data": "v.visit_time", "name": "VISIT_TIME",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false },
				},
				{
					"data": "get_visitor_count_by_visit(v.id) as VISITOR_COUNT", "name": "VISITOR_COUNT",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false },
				},
				{
					"data": "v.category as VISIT_CATEGORY", "name": "VISIT_CATEGORY",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false },

				},
				{
					"data": "v.type as VISIT_TYPE", "name": "VISIT_TYPE",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false },

				},
				{
					"data": "v.status as VISIT_STATUS", "name": "VISIT_STATUS",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false },

				},
				{
					"data": "v.resolution as VISIT_RESOLUTION", "name": "VISIT_RESOLUTION",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false },

				},
				{
					"data": "rvvor.status as STATUS", "name": "STATUS",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false },

				},
				{
					"data": "rvvor.entry_date", "name": "ENTRY_DATE",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false },

				},
				{
					"data": "rvvor.entry_time", "name": "ENTRY_TIME",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false },
				},
			],
			"order": [{ "column": 0, "dir": "desc" }],
			"start": 0,
			"length": 10,
			"search": { "value": "", "regex": false }
		}
	}
}