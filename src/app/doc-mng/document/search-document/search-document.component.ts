import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { BaseService } from 'app/services/base-service';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-search-document',
  templateUrl: './search-document.component.html',
  styleUrls: ['./search-document.component.scss']
})
export class SearchDocumentComponent implements OnInit {
	// Datatable specific variables
	@Output() response: EventEmitter<any> = new EventEmitter();
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
		private spinner: NgxSpinnerService, public dialogRef: NgbActiveModal,
		private router: Router, private baseService: BaseService,
		private fb: FormBuilder, private dtService: DatatablesService,
		private sysRegService: SystemRegistryService, private documentService: DocumentService) { }

	ngOnInit(): void {
		this.filters = null;
		this.pageLengths = this.dtService.pageLengths;
		this.cssClasses = this.dtService.cssClasses;
		this.tblMsgs = this.dtService.getTableMsgs();

		this.tableOptions = this.getTableOptions();
		this.columns = this.dtService.getColumnsArray(this.tableOptions);
		this.createFilterForm();
		// this.renderData(this.tableOptions, this.filters);
		this.fetchEssentialData();
	}

	fetchEssentialData() {
		this.departments$ = this.baseService.getDepartmentList();
	}

	renderData(tableOptions, filters) {
		// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
		this.dataLoadingFlag = true;
		this.spinner.show();
		this.documentService.getRecordList(tableOptions, filters).subscribe((data:any) => {
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
			host_department: [],
			visit_subject: [],
			visit_source: [],
			visit_date: []
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

	select(row) {
        console.log('row clicked>>>', row);
        this.response.emit(row);

        this.dialogRef.close(row);
    }

    closeModal() {
        this.resetFilters();
        this.dialogRef.close();
    }

	getTableOptions() {
		return {
			"draw": 1,
			"columns": [
				{
					"data": "doc.id", "name": "ID",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "fdep.name_dr as FROM_DEPARTMENT", "name": "FROM_DEPARTMENT",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "tdep.name_dr as TO_DEPARTMENT", "name": "TO_DEPARTMENT",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "doc_type.name_dr as DOCUMENT_TYPE", "name": "DOCUMENT_TYPE",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "doc.document_date as DOCUMENT_DATE", "name": "DOCUMENT_DATE",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "doc.title", "name": "TITLE",
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
}
