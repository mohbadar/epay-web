import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { BaseService } from 'app/services/base-service';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyDocumentService } from '../my-document.service';
import { ViewQrcodeComponent } from '../../view-qrcode/view-qrcode.component';
import { ViewContentComponent } from 'app/template/shared/view-content/view-content.component';

@Component({
    selector: 'app-list-my-document',
    templateUrl: './list-my-document.component.html',
    styleUrls: ['./list-my-document.component.scss']
})
export class ListMyDocumentComponent implements OnInit {

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
    isCollapsed: boolean = true;
    showFilterForm: boolean;
    filters: any = {};
    loading = false;
    departments$;
    documentTypes$;
    showFilter = false;

    docStatus = 'UN_PROCESSED';

    count: any = {};


    constructor(private cdref: ChangeDetectorRef, public translate: TranslateService,
        private spinner: NgxSpinnerService, private docMngService: DocMngService,
        private router: Router, private baseService: BaseService, private modalService: NgbModal,
        private fb: FormBuilder, private dtService: DatatablesService,
        private sysRegService: SystemRegistryService, private myDocumentService: MyDocumentService) { }

    ngOnInit(): void {
        this.filters = {};
        this.pageLengths = this.dtService.pageLengths;
        this.cssClasses = this.dtService.cssClasses;
        this.tblMsgs = this.dtService.getTableMsgs();

        this.tableOptions = this.getTableOptions();
        this.columns = this.dtService.getColumnsArray(this.tableOptions);
        this.createFilterForm();
        this.fetchEssentialData();
        this.getDocumentCount();
        this.filterWithDocStatus('UN_PROCESSED');
    }

    getDocumentCount() {
        this.myDocumentService.getMyDocumentCount().subscribe(res => {
            console.log("dashboard data: ", res);
            this.count.processed = res['processed'];
            this.count.unprocessed = res['unprocessed'];
            this.count.underProcess = res['underProcess'];
            this.count.all = res['all'];
            this.spinner.hide();
            this.cdref.detectChanges();
        }, err => {
            console.log("errror in count");
            this.spinner.hide();
        });
    }

    filterWithDocStatus(docStatus) {
        this.docStatus = docStatus;
        switch (docStatus) {
            case 'UNDER_PROCESS':
                this.filterForm.get('document_status_id').setValue(2);
                break;
            case 'PROCCESSED':
                this.filterForm.get('document_status_id').setValue(3);
                break;
            case 'ALL':
                this.filterForm.get('document_status_id').setValue(null);
                break;
            default:
                this.filterForm.get('document_status_id').setValue(1);
                break;
        }
        this.applyFilter();

    }

    fetchEssentialData() {
        this.documentTypes$ = this.docMngService.getDocumentTypesList();
        this.departments$ = this.baseService.getDepartmentList();
    }


    renderData(tableOptions, filters) {
        console.log("🚀 ~ file: list-my-document.component.ts ~ line 119 ~ ListMyDocumentComponent ~ renderData ~ filters", filters)
        // the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
        this.dataLoadingFlag = true;
        this.spinner.show();
        this.myDocumentService.getMyDocumentsList(tableOptions, filters).subscribe((data: any) => {
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
            id: [],
            document_no: [],
            document_date: [],
            from_department_id: [],
            title: [],
            document_type_id: [],
            document_status_id: [],
            from_date: [],
            to_date: [],
            type: [],
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
        filterValues.document_date = filterValues.document_date == null ? null : this.baseService.convertToGregorianDate(filterValues.document_date);
        filterValues.due_date = filterValues.due_date == null ? null : this.baseService.convertToGregorianDate(filterValues.due_date);

        if (filterValues.from_date) {
            this.filters.from_date = this.baseService.convertToGregorianDate(filterValues.from_date);
        }
        if (filterValues.to_date) {
            this.filters.to_date = this.baseService.convertToGregorianDate(filterValues.to_date);
        }
        console.log('Data: ', filterValues);
        console.log('Columns: ', cols);

        newCols = cols.map((col) => {
            col.search = { value: '', regex: false };
            col.searchable = false;

            for (let key in filterValues) {
                if (col.name.toLowerCase() == key && filterValues[key]) {
                    console.log("🚀 ~ file: list-my-document.component.ts ~ line 213 ~ ListMyDocumentComponent ~ newCols=cols.map ~ key", key)
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
        this.router.navigate(['doc_mng/documents/my/add']);
        this.loading = true;
    }

    editRecord(id) {
        console.log("ID:", id);
        this.router.navigate(['doc_mng/documents/' + id + '/edit']);
        this.loading = true;
    }

    deleteRecord() {
        this.loading = true;
    }

    viewQRCode(docId) {
        const modalRef = this.modalService.open(ViewQrcodeComponent, { size: 'sm', backdrop: true },);
        modalRef.componentInstance.docId = docId;
    }
    viewContent(content) {
        console.log(content);
        const modalRef = this.modalService.open(ViewContentComponent);
        modalRef.componentInstance.content = content;
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
                    "data": "doc.type", "name": "TYPE",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc.main_document_id as MAIN_DOC_ID", "name": "MAIN_DOC_ID",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc.document_no", "name": "DOCUMENT_NO",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc.document_status_id as DOCUMENT_STATUS_ID", "name": "DOCUMENT_STATUS_ID",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc_status.name_dr as DOCUMENT_STATUS", "name": "DOCUMENT_STATUS",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc.status as STATUS", "name": "STATUS",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc.due_date", "name": "DUE_DATE",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": " CASE WHEN doc.due_date is not NULL THEN (date(doc.due_date) - CURRENT_DATE) ELSE 0 END as DUE_DAYS", "name": "DUE_DAYS",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc.from_department_id", "name": "FROM_DEPARTMENT_ID",
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
                    "data": "doc.document_type_id", "name": "DOCUMENT_TYPE_ID",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc_type.name_dr as DOCUMENT_TYPE", "name": "DOCUMENT_TYPE",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc.title", "name": "TITLE",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc.document_priority_type as PRIORITY_TYPE", "name": "PRIORITY_TYPE",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc.document_security_level as SECURITY_LEVEL", "name": "SECURITY_LEVEL",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc.document_date", "name": "DOCUMENT_DATE",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false },

                },
                {
                    "data": "doc.CREATED_AT", "name": "CREATED_AT",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false },

                }, {
                    "data": "doc.CONTENT", "name": "CONTENT",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false },

                },
                {
                    "data": "usr.name as CREATED_BY", "name": "CREATED_BY",
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

    changeShowFilterBoolean() {
        this.showFilter = !this.showFilter;
    }

}
