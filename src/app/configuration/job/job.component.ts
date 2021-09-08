import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Globals } from 'app/_helpers/globals';
import { JobService } from 'app/services/job.service';
import { JobCreateDialogComponent } from './dialogs/job-create-dialog/job-create-dialog.component';
import { JobViewDialogComponent } from './dialogs/job-view-dialog/job-view-dialog.component';
import { JobEditDialogComponent } from './dialogs/job-edit-dialog/job-edit-dialog.component';
import { JobDeleteDialogComponent } from './dialogs/job-delete-dialog/job-delete-dialog.component';

@Component({
	selector: 'app-job-configuration',
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
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
		private jobService: JobService,
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
		this.jobService.getJobs().subscribe(data => {
			console.log('jobs list: ', data);
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
		const modalRef = this.modalService.open(JobCreateDialogComponent);
		modalRef.componentInstance.jobCreateEventEmitter.subscribe((createdRecord) => {
				// this.rows = this.rows.concat(createdRecord);
			this.reloadData();
		});
	}

	viewRecord(recordId) {
		this.spinner.show();
		this.jobService.getJob(recordId).subscribe(data => {
			console.log('you data has', data);
			const modalRef = this.modalService.open(JobViewDialogComponent);
			modalRef.componentInstance.data = data;
			this.spinner.hide();
		}, error => {
			this.spinner.hide();
		});
	}

	editRecord(recordId) {
		this.spinner.show();
		this.jobService.getJob(recordId).subscribe(data => {
			console.log('the ministry returned is', data);
			const modalRef = this.modalService.open(JobEditDialogComponent);
			modalRef.componentInstance.data = data;
			modalRef.componentInstance.jobEditEventEmitter.subscribe((updatedRecord) => {
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
		const modalRef = this.modalService.open(JobDeleteDialogComponent);
		modalRef.componentInstance.data = recordId;
		modalRef.componentInstance.jobDeleteEventEmitter.subscribe(() => {
		this.reloadData();
		});
	}
}


