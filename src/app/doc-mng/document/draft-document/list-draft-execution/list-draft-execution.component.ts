import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { BaseService } from 'app/services/base-service';
import { ViewContentComponent } from 'app/template/shared/view-content/view-content.component';
import { Globals } from 'app/_helpers/globals';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewQrcodeComponent } from '../../view-qrcode/view-qrcode.component';
import { DraftDocumentService } from '../draft-document.service';

@Component({
    selector: 'app-list-draft-execution',
    templateUrl: './list-draft-execution.component.html',
    styleUrls: ['./list-draft-execution.component.scss']
})
export class ListDraftExecutionComponent implements OnInit {

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
    documentExecutionTypesList;
    documentTypes$;


    constructor(private cdref: ChangeDetectorRef, public translate: TranslateService,
        private spinner: NgxSpinnerService, private docMngService: DocMngService,
        private router: Router, private baseService: BaseService, private modalService: NgbModal,
        private fb: FormBuilder, private dtService: DatatablesService,
        private globals: Globals,
        private sysRegService: SystemRegistryService, private draftDocumentService: DraftDocumentService) { }

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
        this.loadExecutionTypes();
    }

    loadExecutionTypes() {
        this.docMngService.getDocumentExecutionTypesList().subscribe(res => {
            this.checkDocumentTypesPermissions(res);
        }, err => {
            console.log("error in document executionTypes");
        });
    }

    checkDocumentTypesPermissions(allDocumentTypes) {
        this.documentExecutionTypesList = [];
        allDocumentTypes.forEach(element => {
            if (this.globals.principal.hasAuthority(['DOCMNG_DOC_EXECUTION_TYPE_ARCHIVE']) && element.id === 1) {
                this.documentExecutionTypesList.push(element);
            } else if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_FORWARD"]) && element.id === 2) {
                this.documentExecutionTypesList.push(element);
            } else if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_REJECT"]) && element.id === 3) {
                this.documentExecutionTypesList.push(element);
            } else if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_MAKTOB"]) && element.id === 4) {
                this.documentExecutionTypesList.push(element);
            } else if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_ESTILAM"]) && element.id === 5) {
                this.documentExecutionTypesList.push(element);
            } else if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_PESHNIHAD"]) && element.id === 6) {
                this.documentExecutionTypesList.push(element);
            } else if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_ESTILAM_RESPONSE"]) && element.id === 7) {
                this.documentExecutionTypesList.push(element);
            } else if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_HUKUM_PESHNIHAD"]) && element.id === 8) {
                this.documentExecutionTypesList.push(element);
            } else if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_NOTE"]) && element.id === 9) {
                this.documentExecutionTypesList.push(element);
            } else if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_DIRECTOR_ORDER"]) && element.id === 10) {
                this.documentExecutionTypesList.push(element);
            }
        });
    }


    renderData(tableOptions, filters) {
        this.dataLoadingFlag = true;
        this.spinner.show();
        this.draftDocumentService.getMyExecutionsList(tableOptions, filters).subscribe((data: any) => {
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
            from_department_id: [],
            document_type_id: [],
            document_execution_date: [],
            document_execution_type_id: [],
            document_status_id: [],
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
        filterValues.document_execution_date = filterValues.document_execution_date == null ? null : this.baseService.convertToGregorianDate(filterValues.document_execution_date);

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
                    "data": "dmde.id", "name": "ID",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                }, {
                    "data": "dmde.content", "name": "CONTENT",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "dmde.document_id", "name": "DOCUMENT_ID",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "doc.document_no", "name": "DOCUMENT_NO",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                }, {
                    "data": "dmde.document_date as DOCUMENT_DATE", "name": "DOCUMENT_DATE",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false },

                },
                {
                    "data": "dmde.from_department_id", "name": "FROM_DEPARTMENT_ID",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "fdep.name_dr as FROM_DEPARTMENT", "name": "FROM_DEPARTMENT",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                }, {
                    "data": "dmde.to_department_id", "name": "TO_DEPARTMENT_ID",
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
                    "data": "dmde.document_execution_type_id", "name": "DOCUMENT_EXECUTION_TYPE_ID",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "dmdet.name_dr as DOCUMENT_EXECUTION_TYPE", "name": "DOCUMENT_EXECUTION_TYPE",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "dmde.title", "name": "TITLE",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "dmde.document_priority_type as PRIORITY_TYPE", "name": "PRIORITY_TYPE",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "dmde.document_security_level as SECURITY_LEVEL", "name": "SECURITY_LEVEL",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                }, {
                    "data": "dmde.SCOPE", "name": "SCOPE",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false },
                }, {
                    "data": "dmde.STATUS", "name": "STATUS",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false },
                },
                {
                    "data": "dmde.date as DOCUMENT_EXECUTION_DATE", "name": "DOCUMENT_EXECUTION_DATE",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false },
                },
                {
                    "data": "dmde.CREATED_AT", "name": "CREATED_AT",
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