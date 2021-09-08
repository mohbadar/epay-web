import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { MyDocumentService } from '../my-document.service';
import { BaseService } from 'app/services/base-service';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewQrcodeComponent } from '../../view-qrcode/view-qrcode.component';
import { ViewContentComponent } from 'app/template/shared/view-content/view-content.component';

@Component({
    selector: 'app-list-my-comment',
    templateUrl: './list-my-comment.component.html',
    styleUrls: ['./list-my-comment.component.scss']
})
export class ListMyCommentComponent implements OnInit {

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
    filters;
    loading = false;
    departments$;
    documentTypes$;


    constructor(private cdref: ChangeDetectorRef, public translate: TranslateService,
        private spinner: NgxSpinnerService, private docMngService: DocMngService,
        private router: Router, private baseService: BaseService, private modalService: NgbModal,
        private fb: FormBuilder, private dtService: DatatablesService,
        private sysRegService: SystemRegistryService, private myDocumentService: MyDocumentService) { }

    ngOnInit(): void {
        this.filters = null;
        this.pageLengths = this.dtService.pageLengths;
        this.cssClasses = this.dtService.cssClasses;
        this.tblMsgs = this.dtService.getTableMsgs();

        this.tableOptions = this.getTableOptions();
        this.columns = this.dtService.getColumnsArray(this.tableOptions);
        this.fetchEssentialData();
        this.createFilterForm();
        this.renderData(this.tableOptions, this.filters);
    }

    fetchEssentialData() {
        this.documentTypes$ = this.docMngService.getDocumentTypesList();
        this.departments$ = this.baseService.getDepartmentList();
    }


    renderData(tableOptions, filters) {
        // the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
        this.dataLoadingFlag = true;
        this.spinner.show();
        this.myDocumentService.getMyCommentsList(tableOptions, filters).subscribe((data: any) => {
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
            created_at: [],
            title: [],
            document_type_id: []
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
        filterValues.created_at = filterValues.created_at == null ? null : this.baseService.convertToGregorianDate(filterValues.created_at);
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
        this.router.navigate(['doc_mng/documents/add']);
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
                    "data": "dmdc.id", "name": "ID",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                }, {
                    "data": "dmdc.comment", "name": "COMMENT",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                }, {
                    "data": "dmdc.document_id", "name": "DOCUMENT_ID",
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
                }, {
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
                    "data": "dmdc.CREATED_AT", "name": "CREATED_AT",
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

}
