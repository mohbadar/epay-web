import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Province } from './province'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProvinceService } from 'app/services/province.service';
import { ProvinceEditDialogComponent } from './dialogs/province-edit-dialog/province-edit-dialog.component';
import { ProvinceDeleteDialogComponent } from './dialogs/province-delete-dialog/province-delete-dialog.component';
import { ProvinceViewDialogComponent } from './dialogs/province-view-dialog/province-view-dialog.component';
import { ProvinceCreateDialogComponent } from './dialogs/province-create-dialog/province-create-dialog.component';
import { Globals } from 'app/_helpers/globals';

@Component({
	selector: 'app-province-configuration',
	templateUrl: './province.component.html',
	styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit {
	@ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	SortType = SortType;
	rows = [];
	tempRows = [];
	columnsWithSearch = [];
	closeResult = '';
	dTableFlag = false;
	dTable;
	loading;


	constructor(
		public httpClient: HttpClient,
		public translate: TranslateService,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		public globals: Globals,
		private provinceService: ProvinceService,
		private cdref: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.reloadData();
	}

	refresh() {
		this.reloadData();
	}

	reloadData() {
		this.loading = true;
		this.dTableFlag = false;
		this.provinceService.getProvincesList().subscribe(data => {
			console.log('Provinces list: ', data);
			this.rows = data;
			this.tempRows = this.rows;
			this.dTableFlag = true;
			this.loading = false;
			this.cdref.detectChanges();
			// for specific columns to be search instead of all you can list them by name
			this.columnsWithSearch = Object.keys(this.rows[0]);

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

	addNew() {
		const modalRef = this.modalService.open(ProvinceCreateDialogComponent);
		modalRef.componentInstance.provinceCreateEventEmitter.subscribe((createdRecord) => {
				// this.rows = this.rows.concat(createdRecord);
			this.reloadData();
		});
	}

	viewRecord(recordId) {
		this.spinner.show();
		this.provinceService.getProvince(recordId).subscribe(data => {
			console.log('you data has', data);
			const modalRef = this.modalService.open(ProvinceViewDialogComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, error => {
			this.spinner.hide();
		});
	}

	editRecord(recordId) {
		this.spinner.show();
		this.provinceService.getProvince(recordId).subscribe(data => {
			console.log('the ministry returned is', data);
			const modalRef = this.modalService.open(ProvinceEditDialogComponent);
			modalRef.componentInstance.data = data;
			modalRef.componentInstance.provinceEditEventEmitter.subscribe((updatedRecord) => {
				// this.updateArray(updatedRecord);
				this.reloadData();
			})
			this.spinner.hide();
		}, error => {
			console.log('Error: ', error);
			this.spinner.hide();
		});
	}

	deleteRecord(recordId) 
	{
		const modalRef = this.modalService.open(ProvinceDeleteDialogComponent);
		modalRef.componentInstance.data = recordId;
		modalRef.componentInstance.provinceDeleteEventEmitter.subscribe(() => {
		this.reloadData();
		});
	}
}

