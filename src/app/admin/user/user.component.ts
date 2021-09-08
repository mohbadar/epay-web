import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { GroupService } from '../group/group.service';
import { UserService } from './user.service';
import { AuthService } from 'app/template/shared/auth/auth.service';

import { Globals } from 'app/_helpers/globals';
import { User } from './user'
import { DatatablesService } from 'app/_services/datatables.service';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserCreateDialogComponent } from './dialogs/user-create-dialog/user-create-dialog.component';
import { UserViewDialogComponent } from './dialogs/user-view-dialog/user-view-dialog.component';
import { UserEditDialogComponent } from './dialogs/user-edit-dialog/user-edit-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleService } from '../role/role.service';

@Component({
	selector: 'user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	@ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	SortType = SortType;
	rows = [];
	tempRows = [];
	columnsWithSearch = [];
	closeResult = '';
	
	users: Observable<User[]>;
	
	userData;
	allGroupsData;
	data;
	showEditModal;
	showViewModal;
	showCreateModal;
	dataTablesObservable;
	dTableFlag = false;
	dTable;
	loading;

	constructor(
		public httpClient: HttpClient,
		private userService: UserService,
		private groupService: GroupService,
		public authService: AuthService,
		public globals: Globals,
		private cdref: ChangeDetectorRef,
		private datatables: DatatablesService,
		private translate: TranslateService,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService
	) { }

	ngOnInit() {
		console.log(this.globals);
		this.reloadData();
	}

	refresh() {
		this.reloadData();
	}

	reloadData() {
		// this.result = [];
		this.loading = true;
		this.dTableFlag = false;
		this.userService.getUsersList().subscribe(data => {
			console.log('Users list: ', data);
			
			this.rows = data;
			this.tempRows = this.rows;
			// for specific columns to be search instead of all you can list them by name
			this.columnsWithSearch = Object.keys(this.rows[0]);

			this.dTableFlag = true;
			this.cdref.detectChanges();
			this.loading = false;

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

	addNew(user?: User) {
		this.loading = true;
		this.spinner.show();
		this.userService.getRequiredInfoToCreateNewUser().subscribe( data => {
			this.data = data;
			this.groupService.getGroupsList().subscribe(groupsData => {
					this.allGroupsData = groupsData;
					this.loading = false;
					const modalRef = this.modalService.open(UserCreateDialogComponent);
        			modalRef.componentInstance.data = data;
					modalRef.componentInstance.groupData = groupsData;
					this.spinner.hide();
					modalRef.componentInstance.userCreateEventEmitter.subscribe(() => {
						this.reloadData();
					});
				}, err => {
					this.spinner.hide();
					console.log('Error: ', err);
					this.loading = false;
			});
		}, err => {
			console.log('Error:', err);
		})
	}

	viewRecord(recordId) {
		this.spinner.show();
		console.log('View User')
		this.userService.getUser(recordId).subscribe(data => {
			this.userData = data;
			const modalRef = this.modalService.open(UserViewDialogComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, err => {
			console.log('Error: ', err);
			this.spinner.hide();
		});
	}

	editRecord(recordId) {
		this.spinner.show();
		this.userService.getUser(recordId).subscribe(data => {
			console.log('the user coming is:', data);
			this.userData = data;
			const modalRef = this.modalService.open(UserEditDialogComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, err => {
			this.spinner.hide();
		});
	}

	// Open default modal
    openContent(component) {
        const modalRef = this.modalService.open(component);
        modalRef.componentInstance.name = 'World';
    }
}
