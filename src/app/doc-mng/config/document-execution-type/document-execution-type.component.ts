import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { Globals } from 'app/_helpers/globals';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateDocumentExecutionTypeComponent } from './create-document-execution-type/create-document-execution-type.component';
import { EditDocumentExecutionTypeComponent } from './edit-document-execution-type/edit-document-execution-type.component';
import { ViewDocumentExecutionTypeComponent } from './view-document-execution-type/view-document-execution-type.component';

@Component({
  selector: 'app-document-execution-type',
  templateUrl: './document-execution-type.component.html',
  styleUrls: ['./document-execution-type.component.scss']
})
export class DocumentExecutionTypeComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	SortType = SortType;
	rows = [];
	tempRows = [];
	columnsWithSearch = [];
	closeResult = '';
	dTable;
	loading;
	dataTableFlag = false;
	tableOptions;
	tableMessages;
	cssClasses;
	filters;
	recordsTotal: number;
	filterForm: FormGroup;
	pageLengths;
	shuraList;
  constructor(
    public httpClient: HttpClient,
		public translate: TranslateService,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		public globals: Globals,
		private docMngService: DocMngService,
		private cdref: ChangeDetectorRef,
		private dataTableService: DatatablesService,
		private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filters = null;
		this.pageLengths = this.dataTableService.pageLengths;
		this.tableMessages = this.dataTableService.getTableMsgs();
		this.tableOptions = this.testTableOptions();
		this.cssClasses = this.dataTableService.cssClasses;
		this.renderData(this.tableOptions);
		this.createFilterForm();
  }

  refresh() {
		this.renderData(this.tableOptions);
	}




  renderData(tableOptions) {
		// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
		this.loading = true;
		this.spinner.show();
		this.docMngService.getDocTypeRecordList(tableOptions, this.filters).subscribe((data: any) => {
			if (data == null) {
				console.log(data);
				this.rows = [];
				this.recordsTotal = 0;
			} else {
				console.log("data from server ", data.data);
				console.log(data);
				this.spinner.hide();

				this.rows = this.dataTableService.parseDatatableData(this, tableOptions, data.data);
				this.recordsTotal = data.recordsTotal;
				this.dataTableFlag = true;
			}

			this.cdref.detectChanges();
			this.loading = false;
		}, (err) => {
			this.spinner.hide();
			console.log('data error: ', err);
			this.cdref.detectChanges();
		});
	}


	searchTerm(val) {
		// filter our data
		const temp = this.tempRows.filter((d) => {
			console.log(d);
			// single filter
			// return d.name.toLowerCase().indexOf(val) !== -1 || !val;

			// Multi Column Filter
			// iterate through each row's column data
			for (let i = 0; i < this.columnsWithSearch.length; i++){
				var colValue = d[this.columnsWithSearch[i]] ;

				// if no filter OR colvalue is NOT null AND contains the given filter
				if (!val || (!!colValue && colValue.toString().toLowerCase().indexOf(val) !== -1)) {
					// found match, return true to add to result set
					return true;
				}
			}
		});

		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		this.table.offset = 0;
	}

  addNew(){
    const modalRef = this.modalService.open(CreateDocumentExecutionTypeComponent);
		modalRef.componentInstance.shuraCreateEventEmitter.subscribe((createdRecord) => {
			this.renderData(this.tableOptions);
		});
  }
  

  editRecord(recordId) {
		this.spinner.show();
		this.docMngService.getDocTyeById(recordId).subscribe(data => {
			console.log('the shura returned is', data);
			const modalRef = this.modalService.open(EditDocumentExecutionTypeComponent);
			modalRef.componentInstance.data = data;
			modalRef.componentInstance.shuraEditEventEmitter.subscribe((updatedRecord) => {
				this.renderData(this.tableOptions);
			})
			this.spinner.hide();
		}, error => {
			console.log('Error: ', error);
			this.spinner.hide();
		});
	}

  deleteRecord(recordId)
	{
		// const modalRef = this.modalService.open(DeleteDocumentExecutionTypeComponent‌);
		// modalRef.componentInstance.data = recordId;
		// modalRef.componentInstance.shuraDeleteEventEmitter.subscribe(() => {
    //   this.renderData(this.tableOptions);
		// });
	}

  viewRecord(recordId) {
		this.spinner.show();
		this.docMngService.getDocTyeById(recordId).subscribe(data => {
			console.log('you data has', data);
			const modalRef = this.modalService.open(ViewDocumentExecutionTypeComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, error => {
			this.spinner.hide();
		});
	}

 

	testTableOptions() {
		return {
			"draw": 1,
			"columns": [
				{
					"data": "doctype.id", "name": "ID",
					"searchable": true, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "doctype.name_dr", "name": "NAME_DR",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false }
				},
        {
					"data": "doctype.name_en", "name": "NAME_EN",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false }
				},
        {
					"data": "doctype.name_ps", "name": "NAME_PS",
					"searchable": true, "orderable": true,
					"search": { "value": "", "searchable": true, "regex": false }
				},
			],
			"order": [{ "column": 0, "dir": "DESC" }],
			"start": 0,
			"length": 10,
			"search": { "value": "", "regex": false }
		}
	}

	setPage(pageInfo) {
		this.tableOptions.draw = pageInfo.offset + 1;
		let start = (this.tableOptions.draw * this.tableOptions.length) - this.tableOptions.length;
		this.tableOptions['start'] = start;
		this.renderData(this.tableOptions);
	}

	createFilterForm()
	{
	  this.filterForm = this.formBuilder.group({
		name_dr: []
	  });
	}

	setPageLength(value) {
		console.log(value);
		this.tableOptions.length = Number(value);
		this.renderData(this.tableOptions);
	}

	resetFilters() {
		this.filterForm.reset();
		this.applyFilter();
		this.renderData(this.tableOptions);
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
		this.renderData(this.tableOptions);
	}

}
