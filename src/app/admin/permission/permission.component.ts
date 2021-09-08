import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { Permission } from './permission';
import { DatatablesService } from 'app/_services/datatables.service';
import { PermissionService } from './permission.service';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { Globals } from 'app/_helpers/globals';

declare var $: any;

@Component({
	selector: 'permission',
	templateUrl: './permission.component.html',
	styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit, OnDestroy {
	@ViewChild(DatatableComponent) table: DatatableComponent;
	permissions: Observable<Permission[]>;
	result: Permission[];
	headerRow = ['Id', 'Name', 'Description', 'Active'];
	isLoading = true;
	dataTablesObservable;
	dTable;
	dTableFlag = false;
	// datatables options
	dtOptions = {};
	loading = false;
	rows = [];
	tempRows = [];
	columnsWithSearch = [];
	ColumnMode = ColumnMode;



	constructor(public httpClient: HttpClient,
		private permissionService: PermissionService,
		public authService: AuthService,
		private cdref: ChangeDetectorRef,
		private datatables: DatatablesService,
		public globals: Globals
	) { }

	ngOnInit() {
		this.reloadData();
		this.dtOptions = {
			'pagingType': 'full_numbers',
			'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
			responsive: true,
			language: this.datatables.selectedJsonFile
		};
		this.changeLanguage();

	}

	refresh() {
		this.reloadData();
	}


	changeLanguage() {
		this.dataTablesObservable = this.datatables.callToServiceMethodSource.subscribe(data => {
			this.dtOptions['oLanguage'] = data.default;
			if (this.dTableFlag) {
				// Initialize datatable if not initialized before
				if (!$.fn.DataTable.isDataTable('#datatables')) {
					this.dTable = $('#datatables').DataTable(this.dtOptions);
				} else {
					console.log('dtOptions: ', this.dtOptions);
					this.dTable.destroy();
					this.dTable = null;
					this.dTable = $('#datatables').DataTable(this.dtOptions);
				}
			}
		});
	}


	reloadData() {
		// this.result = [];
		this.loading = true;
		this.dTableFlag = false;
		this.permissionService.getPermissionsList().subscribe(data => {
			this.rows = data;
			this.tempRows = this.rows;
			// for specific columns to be search instead of all you can list them by name
			this.columnsWithSearch = Object.keys(this.rows[0]);

			this.dTableFlag = true;
			this.cdref.detectChanges();
			this.loading = false;

			// this.initTable();
			// this.dTableFlag = true;
			// this.cdref.detectChanges();
			// this.loading = false;

			// this.initTable();
			// console.log('roles data ', this.result);

		}, (err) => {
			console.log('data error: ', err);
			this.loading = false;
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

	// initTable() {
	// 	// Initialize datatable if not initialized before
	// 	if (!$.fn.DataTable.isDataTable('#datatables')) {
	// 		console.log('Initialized in reloadData');
	// 		this.dTable = $('#datatables').DataTable(this.dtOptions);
	// 	} else {
	// 		console.log('Reinitialized in reloadDatd');
	// 		this.dTable.destroy();
	// 		this.dTable = null;
	// 		this.dTable = $('#datatables').DataTable(this.dtOptions);
	// 	}

	// }

	ngOnDestroy() {
		if (this.dataTablesObservable) {
			this.dataTablesObservable.unsubscribe();
		}
	}
}
