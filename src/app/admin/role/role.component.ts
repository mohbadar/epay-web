import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { RoleService } from './role.service';
import { PermissionService } from '../permission/permission.service';
import { Role } from './role';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { DatatablesService } from 'app/_services/datatables.service';
import { Globals } from 'app/_helpers/globals';
import { TranslateService } from '@ngx-translate/core';
import { RoleEditDialogComponent } from './dialogs/role-edit-dialog/role-edit-dialog.component';
import { RoleViewDialogComponent } from './dialogs/role-view-dialog/role-view-dialog.component';
import { UserCreateDialogComponent } from '../user/dialogs/user-create-dialog/user-create-dialog.component';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleCreateDialogComponent } from './dialogs/role-create-dialog/role-create-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
	selector: 'role',
	templateUrl: './role.component.html',
	styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
	@ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	SortType = SortType;
	rows = [];
	tempRows = [];
	columnsWithSearch = [];
	closeResult = '';

	result: Role[];
	roleData;
	allPermissionsData;
	showEditModal;
	showViewModal;
	showCreateModal;
	dataTablesObservable;
	dTable;
	dTableFlag = false;

	headerRow = ['ID', 'NAME', 'DESCRIPTION', 'ACTIVE', 'ACTIONS'];
	isLoading = true;
	loading;

	constructor(public httpClient: HttpClient,
		private roleService: RoleService,
		private permissionService: PermissionService,
		public authService: AuthService,
		public globals: Globals,
		private cdref: ChangeDetectorRef,
		private datatables: DatatablesService,
		private translate: TranslateService,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService
	) { }

	ngOnInit() {
		this.reloadData();
	}

	refresh() {
		this.reloadData();
	}

	reloadData() {
		// this.result = [];
		this.loading = true;
		this.dTableFlag = false;
		this.roleService.getRolesList().subscribe(data => {
			this.rows = data;
			this.tempRows = this.rows;
			// for specific columns to be search instead of all you can list them by name
			this.columnsWithSearch = Object.keys(this.rows[0]);


			this.dTableFlag = true;
			this.cdref.detectChanges();
			this.loading = false;

			this.isLoading = false;
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

	addNew(role?: Role) {
		this.loading = true;
		this.permissionService.getPermissionsList().subscribe((permissions) => {
			this.allPermissionsData = permissions;
			this.loading = false;
			console.log('all permissions are:', this.allPermissionsData);
			const modalRef = this.modalService.open(RoleCreateDialogComponent);
			modalRef.componentInstance.data = permissions;
			modalRef.componentInstance.roleCreateEventEmitter.subscribe(() => {
				this.reloadData();
			})
		});
	}

	viewRecord(recordId) {
		this.spinner.show();
		this.roleService.getRole(recordId).subscribe(data => {
			this.roleData = data;
			const modalRef = this.modalService.open(RoleViewDialogComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, err => {
			this.spinner.hide();
		});
	}

	editRecord(recordId) {
		this.spinner.show();
		this.roleService.getRole(recordId).subscribe(data => {
			// console.log('the role coming is:' + JSON.stringify(data));
			this.roleData = data;
			const modalRef = this.modalService.open(RoleEditDialogComponent);
			modalRef.componentInstance.data = data;
			modalRef.componentInstance.roleEditEventEmitter.subscribe((updatedRecord) => {
				this.reloadData();
			});
			this.spinner.hide();
		}, error => {
			console.log('Error: ', error);
			this.spinner.hide();
		});
	}

}
