import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { DeletePhotoComponent } from './delete-photo/delete-photo.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import { GalleryService } from './gallery.service';
import { ViewPhotoComponent } from './view-photo/view-photo.component';

declare var window: any;

@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
	@ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	filters;
	loading = false;
	dataLoadingFlag: boolean;
	rows: any[];
	recordsTotal: number;
	tableOptions;
	filterForm: FormGroup;
	pageLengths;
	cssClasses;
	parsedUrl;
	baseUrl;


	constructor(
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		private translate: TranslateService,
		private changeDetectorRef: ChangeDetectorRef,
		private dataTablesService: DatatablesService,
		private galleryService: GalleryService,
		private formBuilder: FormBuilder	) { }

	ngOnInit(): void {
		this.parsedUrl = new URL(window.location.href);
		this.baseUrl = this.parsedUrl.origin;
		this.filters = null;
		this.pageLengths = this.dataTablesService.pageLengths;
		this.cssClasses = this.dataTablesService.cssClasses;
		this.tableOptions = this.getTableOptions();
		this.createFilterForm();
		this.renderData(this.tableOptions, this.filters);
	}

	renderData(tableOptions, filters) {
		// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
		this.dataLoadingFlag = true;
		this.spinner.show();
		this.galleryService.getRecordList(tableOptions, filters).subscribe((data: any) => {
			if (data == null) {
				this.rows = [];
				this.recordsTotal = 0;
			} else {
				console.log("data from server ", data.data);
				console.log(data);
				this.spinner.hide();

				this.rows = this.dataTablesService.parseDatatableData(this, tableOptions, data.data);
				this.recordsTotal = data.recordsTotal;
			}

			this.changeDetectorRef.detectChanges();
			this.dataLoadingFlag = false;
		}, (err) => {
			this.spinner.hide();
			console.log('data error: ', err);
		});
	}

	reload() {
		this.renderData(this.tableOptions, this.filters);
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

	addNewRecord() {
		const modalRef = this.modalService.open(AddPhotoComponent, { centered: true });
		modalRef.componentInstance.addPhotoEventEmitter.subscribe(() => {
			this.reload();
		});
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

	getTableOptions() {
		return {
			"draw": 1,
			"columns": [
				{
					"data": "docGallery.id", "name": "ID",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "docGallery.name", "name": "NAME",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				},
				{
					"data": "docGallery.thumbnail_name as thumbnail", "name": "THUMBNAIL",
					"searchable": false, "orderable": true,
					"search": { "value": "", "regex": false }
				}
			],
			"order": [{ "column": 0, "dir": "desc" }],
			"start": 0,
			"length": 10,
			"search": { "value": "", "regex": false }
		}
	}

	prepareFilter(vl) {
		let d: DataTableColumn[] = this.tableOptions.columns;
		const dd = [];
		console.log('Data: ', vl);
		console.log('Columns: ', d);

		for (let i in vl) {
			console.log('i is: ', i);

			const l = d.filter(t => t.name.toLowerCase() == i)[0];
			console.log('Testing: ', i, " value ", l);

			console.log(' vl[i] : ', vl[i]);

			if (l && vl[i]) {
				l.search = { value: vl[i], regex: true };
				console.log('l.search: ', l);

			} else {
				l.search = { value: '', regex: false };
			}

			dd.push(l);
		}
		console.log('data columns: ', dd);

		return dd;
	}

	resetFilters() {
		this.filterForm.reset();
		this.applyFilter();
	}


	searchColumn(searchTerm, index) {
		this.tableOptions = this.dataTablesService.searchColumn(this.tableOptions, index, searchTerm);
		this.renderData(this.tableOptions, this.filters);
	}

	orderColumn(columnOptions, index) {
		if (columnOptions['orderable'] == true) {
			this.tableOptions = this.dataTablesService.orderColumn(this.tableOptions, index);
			this.renderData(this.tableOptions, this.filters);
		}
	}

	createFilterForm() {
		this.filterForm = this.formBuilder.group({
			name: []
		});
	}

	ngAfterViewInit() {
		this.table.offset = this.pageLengths - 1;
	  }

	openViewPhotoModal(rowId) {
		const modalRef = this.modalService.open(ViewPhotoComponent, { centered: true, size: 'lg' });
		modalRef.componentInstance.data = rowId;
	}

	openDeleteModal(rowId) {
		const modalRef = this.modalService.open(DeletePhotoComponent, {
			centered: true
		});
		modalRef.componentInstance.data = rowId;
		modalRef.componentInstance.photoDeleteEventEmitter.subscribe(() => {
			this.renderData(this.tableOptions, this.filters);
		});
	}

	openImageUrlInNewTab() {
		console.log("abc");
	}

	openEditPhotoComponent(row) {
		console.log(row);
		const modalRef = this.modalService.open(EditPhotoComponent, {
			centered: true
		});
		modalRef.componentInstance.id = row.ID;
		modalRef.componentInstance.editPhotoEventEmitter.subscribe(() => {
			this.reload();
		});
	}

}
