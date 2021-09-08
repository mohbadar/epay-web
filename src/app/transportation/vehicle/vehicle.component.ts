import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { SystemRegistryService } from 'app/admin/system-registry/system-registry.service';
import { BaseService } from 'app/services/base-service';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VehicleService } from './vehicle.service';
import {TransportService} from 'app/transportation/transport.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
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
  drivers$;

  constructor(private cdref: ChangeDetectorRef, public translate: TranslateService,
		private spinner: NgxSpinnerService,
		private router: Router, private baseService: BaseService,
		private fb: FormBuilder, private dtService: DatatablesService,
		private sysRegService: SystemRegistryService, private vehicleService: VehicleService,
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
    }

    renderData(tableOptions, filters) {
      // the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
      this.dataLoadingFlag = true;
      this.spinner.show();
      this.vehicleService.getRecordList(tableOptions, filters).subscribe((data:any) => {
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

    createFilterForm() {
      this.filterForm = this.fb.group({
      manufacturer: [],
      model:[],
      year:[]
    });
  }

  resetFilters() {
    this.filterForm.reset();
    this.applyFilter();
  }


  addNewRecord() {
    this.router.navigate(['transport/vehicles/add']);
    this.loading = true;
  }

  editRecord(id) {
    console.log("ID:",id);
    this.router.navigate(['transport/vehicles/'+id+'/edit']);
    this.loading = true;
  }

  deleteRecord() {
    this.loading = true;
  }


  getTableOptions() {
    return {
      "draw": 1,
      "columns": [
        {
          "data": "veh.id", "name": "ID",
          "searchable": false, "orderable": true,
          "search": { "value": "", "regex": false }
        },

        {
          "data": "veh.vehicle_class", "name": "VEHICLE_CLASS",
          "searchable": false, "orderable": true,
          "search": { "value": "", "regex": false }
        },

        {
          "data": "veh.manufacturer", "name": "MANUFACTURER",
          "searchable": false, "orderable": true,
          "search": { "value": "", "regex": false }
        },

        {
          "data": "veh.model", "name": "MODEL",
          "searchable": false, "orderable": true,
          "search": { "value": "", "regex": false }
        },

        {
          "data": "veh.type", "name": "TYPE",
          "searchable": false, "orderable": true,
          "search": { "value": "", "regex": false }
        },


        {
          "data": "veh.year", "name": "YEAR",
          "searchable": false, "orderable": true,
          "search": { "value": "", "regex": false }
        },

        {
          "data": "veh.colour", "name": "COLOUR",
          "searchable": false, "orderable": true,
          "search": { "value": "", "regex": false }
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
