import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { TransportService } from 'app/transportation/transport.service';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestService } from '../request.service';
import { ViewRequestComponent } from '../view-request/view-request.component';

@Component({
  selector: 'app-list-my-request',
  templateUrl: './list-my-request.component.html',
  styleUrls: ['./list-my-request.component.scss']
})
export class ListMyRequestComponent implements OnInit {
	// Datatable specific variables
	@ViewChild(DatatableComponent) table: DatatableComponent;
	@ViewChild('tableRowDetails') tableRowDetails: any;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	tableOptions;
	tblMsgs;
	columns;
	dataLoadingFlag: boolean;
	reorderable = true;
	swapColumns = false;
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
	departments$;



	constructor(private cdref: ChangeDetectorRef, public translate: TranslateService,
		private spinner: NgxSpinnerService, private modalService: NgbModal,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		private router: Router, private baseService: BaseService,
		private fb: FormBuilder, private dtService: DatatablesService,
		private sysRegService: SystemRegistryService, private requestService: RequestService,
		private transportService:TransportService) { }

	ngOnInit(): void {
		this.filters = null;
		this.pageLengths = this.dtService.pageLengths;
		this.cssClasses = this.dtService.cssClasses;
		this.tblMsgs = this.dtService.getTableMsgs();

		this.tableOptions = this.getTableOptions();
		this.columns = this.dtService.getColumnsArray(this.tableOptions);
		this.createFilterForm();
		this.renderData(this.tableOptions, this.filters);
    this.fetchEssentialData();
	}

  fetchEssentialData() {
    this.departments$ = this.baseService.getDepartmentList();
	}

	renderData(tableOptions, filters) {
		// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
		this.dataLoadingFlag = true;
		this.spinner.show();
		this.requestService.getMyRecordList(tableOptions, filters).subscribe((data:any) => {
			if (data == null) {
				this.rows = [];
				this.recordsTotal = 0;
			} else {
				console.log("data from server ", data.data);
				console.log(data);
				this.spinner.hide();

				this.rows = this.dtService.parseDatatableData(this, tableOptions, data.data);
				this.recordsTotal = data.recordsTotal;
			}

			this.cdref.detectChanges();
			this.dataLoadingFlag = false;
		}, (err) => {
			this.spinner.hide();
			console.log('data error: ', err);
			// this.cdref.detectChanges();
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
			departmentId: [],
			driverId: [],
			vehicleId: [],
			requestDate: []
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

	onSort(event) {
		// event was triggered, start sort sequence
		console.log('Sort Event', event);
		event.sorts[0].prop
		let index = this.dtService.getColumnIndex(this.tableOptions, event.sorts[0].prop);
		this.tableOptions = this.dtService.orderColumn(this.tableOptions, index);
		this.renderData(this.tableOptions, this.filters);
	}

	addNewRecord() {
		this.router.navigate(['transport/requests/add']);
		this.loading = true;
	}

	viewRecord(row) {
		const modalRef = this.modalService.open(ViewRequestComponent, {
			centered: true, size: 'xl', backdrop:  true, keyboard: false
		});
		modalRef.componentInstance.requestId = row.ID;
	}

	editRecord(id) {
		console.log("ID:",id);
		this.router.navigate(['transport/requests/'+id+'/edit']);
		this.loading = true;
	}

	cancelRecord(id) {
        this.spinner.show();
        this.requestService.cancelRequest(id, {}).subscribe(res => {
            this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
			this.renderData(this.tableOptions, this.filters);
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });

    }

	deleteRecord() {
		this.loading = true;
	}

	getTableOptions() {
		return {
			"draw": 1,
			"columns": [
				{
					"data": "req.id", "name": "ID",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "req.status", "name": "STATUS",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "req.resolution", "name": "RESOLUTION",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "reqdep.name_dr as requesting_department", "name": "REQUESTING_DEPARTMENT",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false }
				},
				{
					"data": "req.pickup_location", "name": "PICKUP_LOCATION",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "req.drop_off_location", "name": "DROP_OFF_LOCATION",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "req.pickup_date", "name": "PICKUP_DATE",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "req.pickup_time", "name": "PICKUP_TIME",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "req.return_time", "name": "RETURN_TIME",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "req.has_return", "name": "HAS_RETURN",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "tran_dr.full_name as DRIVER_NAME", "name": "DRIVER_NAME",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "tran_veh.model", "name": "MODEL",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "tran_veh.plate_no", "name": "PLATE_NO",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "usr.name as CREATED_BY", "name": "CREATED_BY",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "p_usr.name as PROCESSED_BY", "name": "PROCESSED_BY",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
			],
			"order": [{ "column": 0, "dir": "desc" }],
			"start": 0,
			"length": 10,
			"search": { "value": "", "regex": false }
		}
	}

  printRequest(id) {
    this.requestService.printRequest(id);
  }

}
