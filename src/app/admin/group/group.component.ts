import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { GroupService } from './group.service'
import { Group } from './group'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RoleService } from '../role/role.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { DatatablesService } from 'app/_services/datatables.service';
import { Globals } from 'app/_helpers/globals';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { GroupCreateDialogComponent } from './dialogs/group-create-dialog/group-create-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupEditDialogComponent } from './dialogs/group-edit-dialog/group-edit-dialog.component';
import { GroupViewDialogComponent } from './dialogs/group-view-dialog/group-view-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'group',
	templateUrl: './group.component.html',
	styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
	@ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	SortType = SortType;
	rows = [];
	tempRows = [];
	columnsWithSearch = [];
	closeResult = '';



	
	groups: Observable<Group[]>;
	result: Group[];
	allRoles;
	recordData;
	showEditModal;
	showViewModal;
	dataTablesObservable;
	showCreateModal;
	dTableFlag = false;
	dTable;
	loading;
	viewLoading;
	editLoading;

	// datatables options
	dtOptions = {};
	headerRow = ['ID', 'NAME', 'DESCRIPTION', 'ACTIVE', 'ACTIONS'];
	isLoading = true;


	constructor(public httpClient: HttpClient,
		public authService: AuthService,
		public globals: Globals,
		public groupService: GroupService,
		public roleService: RoleService,
		private cdref: ChangeDetectorRef,
		private datatables: DatatablesService,
		private translate: TranslateService,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService
	) { }


	ngOnInit() {
		this.reloadData();
		console.log(this.globals);
		// this.dtOptions = {
		// 	'pagingType': 'full_numbers',
		// 	'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
		// 	responsive: true,
		// 	language: this.datatables.selectedJsonFile
		// };
		// this.changeLanguage();

	}

	changeLanguage() {

		// this.dataTablesObservable = this.datatables.callToServiceMethodSource.subscribe(data => {
		// 	this.dtOptions['oLanguage'] = data.default;
		// 	if (this.dTableFlag) {
				// Initialize datatable if not initialized before
				// if (!$.fn.DataTable.isDataTable('#datatables')) {
				// 	this.dTable = $('#datatables').DataTable(this.dtOptions);
				// } else {
				// 	console.log('dtOptions: ', this.dtOptions);
				// 	this.dTable.destroy();
				// 	this.dTable = null;
				// 	this.dTable = $('#datatables').DataTable(this.dtOptions);
				// }
			// }
		// });
	}

	toggleModal(data) {
		// $('#createModal').modal('hide');
		// if (data.modalType === 'create') {
		// 	$('#createModal').modal('hide');
		// 	$('#createModal').on('hidden.bs.modal', (e) => {
		// 		this.showCreateModal = false;
		// 		$('#createModal').off('hidden.bs.modal');
		// 		if (data.newRecord) {
		// 			this.reloadData();
		// 		}
		// 	});
		// }

		// if (data.modalType === 'edit') {
		// 	$('#editModal').modal('hide');
		// 	$('#editModal').on('hidden.bs.modal', (e) => {
		// 		this.showEditModal = false;
		// 		$('#editModal').off('hidden.bs.modal');
		// 		if (data.button === 'update') {
		// 			console.log('Update');
		// 			this.reloadData();
		// 		}
		// 	});
		// }
	}

	public applyFilter(value: string) {
		// this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	refresh() {
		this.reloadData();
	}

	cancel(){
		// $('#editModal').modal('hide');
		this.showEditModal = false;
	}

	private refreshTable() {
		// Refreshing table using paginator
		// this.paginator._changePageSize(this.paginator.pageSize);
	}

	reloadData() {
		this.loading = true;
		this.dTableFlag = false;
		this.spinner.show();
		this.groupService.getGroupsList().subscribe(data => {
			console.log('Group list: ', data);
			this.rows = data;
			this.tempRows = this.rows;
			// for specific columns to be search instead of all you can list them by name
			this.columnsWithSearch = Object.keys(this.rows[0]);

			this.dTableFlag = true;
			this.cdref.detectChanges();
			this.loading = false;
			this.spinner.hide();

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

	addNew(group?: Group) {
		this.loading = true;
		this.roleService.getRolesList().subscribe(rolesData => {
			this.allRoles = rolesData;
			this.loading = false;
			console.log('all roles are:', this.allRoles);
			const modalRef = this.modalService.open(GroupCreateDialogComponent);
			modalRef.componentInstance.data = rolesData;
			modalRef.componentInstance.groupCreateEventEmitter.subscribe((createdRecord) => {
				// this.rows = this.rows.concat(createdRecord);
				this.reloadData();
			})
		}, error => {
			console.log('Error: ', error);
			this.loading = false;
		});
	}

	viewRecord(recordId) {
		this.spinner.show();
		this.groupService.getGroup(recordId).subscribe(data => {
			console.log('you data has', data);
			this.recordData = data;
			const modalRef = this.modalService.open(GroupViewDialogComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, error => {
			this.spinner.hide();
		});
	}

	editRecord(recordId) {
		this.spinner.show();
		this.groupService.getGroup(recordId).subscribe(data => {
			console.log('the group returned is', data);
			this.recordData = data;
			const modalRef = this.modalService.open(GroupEditDialogComponent);
			modalRef.componentInstance.data = data;
			modalRef.componentInstance.groupEditEventEmitter.subscribe((updatedRecord) => {
				// this.updateArray(updatedRecord);
				this.reloadData();
			})
			this.spinner.hide();
		}, error => {
			console.log('Error: ', error);
			this.spinner.hide();
		});
	}

	// updateArray(updatedData) {
	// 	const elementIndex = this.rows.findIndex(element => element.id == updatedData.id);
	// 	this.rows[elementIndex] = updatedData;
	// }

}


