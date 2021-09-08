import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Department } from './department'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Globals } from 'app/_helpers/globals';
import { DepartmentCreateDialogComponent } from './dialogs/department-create-dialog/department-create-dialog.component';
import { DepartmentViewDialogComponent } from './dialogs/department-view-dialog/department-view-dialog.component';
import { DepartmentEditDialogComponent } from './dialogs/department-edit-dialog/department-edit-dialog.component';
import { DepartmentService } from './department.service';
import { DepartmentDeleteDialogComponent } from './dialogs/department-delete-dialog/department-delete-dialog.component';
import { DatatablesService } from 'app/_services/datatables.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableColumn } from 'app/_models/datatable-column';

@Component({
    selector: 'app-department-configuration',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    ColumnMode = ColumnMode;
    SelectionType = SelectionType;
    SortType = SortType;
    tableOptions;
    columns;
    rows: any[];
    recordsTotal: number;
    tempRows = [];
    columnsWithSearch = [];
    closeResult = '';
    dTableFlag = false;
    dTable;
    loading;
    dataLoadingFlag: boolean;

    filterForm: FormGroup;
    viewRecordInModal: any = true;
    isCollapsed: boolean = false;
    showFilterForm: boolean;
    filters;

    constructor(
        public httpClient: HttpClient,
        public translate: TranslateService,
        private modalService: NgbModal,
        private spinner: NgxSpinnerService,
        public globals: Globals,
        private fb: FormBuilder,
        private cdref: ChangeDetectorRef,
        private departmentService: DepartmentService,
        private dtService: DatatablesService,
    ) { }


    ngOnInit() {
        this.filters = null;
        this.tableOptions = this.datatableOptions();
        this.columns = this.dtService.getColumnsArray(this.tableOptions);
        this.renderData(this.tableOptions, this.filters);
    }

    renderData(tableOptions, filters) {
        this.loading = true;
        this.dTableFlag = false;
        this.departmentService.getRecordList(tableOptions, filters).subscribe((data: any) => {
            console.log(data);
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
            console.log('data error: ', err);
            this.loading = false;
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
            title: [],
            document_type_id: []
        });
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

    addNew() {
        const modalRef = this.modalService.open(DepartmentCreateDialogComponent);
        modalRef.componentInstance.departmentCreateEventEmitter.subscribe((createdRecord) => {
            // this.rows = this.rows.concat(createdRecord);
            this.renderData(this.tableOptions, this.filters);
        });
    }

    viewRecord(recordId) {
        this.spinner.show();
        this.departmentService.getRecordById(recordId).subscribe(data => {
            console.log('you data has', data);
            const modalRef = this.modalService.open(DepartmentViewDialogComponent);
            modalRef.componentInstance.data = data;
            this.spinner.hide();
        }, error => {
            this.spinner.hide();
        });
    }

    editRecord(recordId) {
        console.log("🚀 ~ file: department.component.ts ~ line 194 ~ DepartmentComponent ~ editRecord ~ recordId", recordId)
        this.spinner.show();
        this.departmentService.getRecordById(recordId).subscribe(data => {
            console.log('the ministry returned is', data);
            const modalRef = this.modalService.open(DepartmentEditDialogComponent);
            modalRef.componentInstance.data = data;
            modalRef.componentInstance.departmentEditEventEmitter.subscribe((updatedRecord) => {
                // this.updateArray(updatedRecord);
                this.renderData(this.tableOptions, this.filters);
            })
            this.spinner.hide();
        }, error => {
            console.log('Error: ', error);
            this.spinner.hide();
        });
    }

    deleteRecord(recordId) {
        const modalRef = this.modalService.open(DepartmentDeleteDialogComponent);
        modalRef.componentInstance.data = recordId;
        modalRef.componentInstance.departmentDeleteEventEmitter.subscribe(() => {
            this.renderData(this.tableOptions, this.filters);
        });
    }

    datatableOptions() {
        return {
            "draw": 1,
            "columns": [
                {
                    "data": "dep.id", "name": "ID",
                    "searchable": false, "orderable": true,
                    "search": { "value": "", "regex": false }
                },
                {
                    "data": "dep.header", "name": "HEADER",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false }
                },
                {
                    "data": "dep.name_en", "name": "NAME_EN",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false }
                },
                {
                    "data": "dep.name_dr", "name": "NAME_DR",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false }
                },
                {
                    "data": "dep.name_ps", "name": "NAME_PS",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false }
                },
                {
                    "data": "dep.parent_id as parent", "name": "PARENT",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false },

                },
                {
                    "data": "dep.footer", "name": "FOOTER",
                    "searchable": true, "orderable": true,
                    "search": { "value": "", "searchable": true, "regex": false }
                }
            ],
            "order": [{ "column": 0, "dir": "asc" }],
            "start": 0,
            "length": 10,
            "search": { "value": "", "regex": false }
        }
    }

}


