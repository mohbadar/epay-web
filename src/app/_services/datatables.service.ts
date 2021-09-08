import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DatatableConfig } from './datatables.config';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root',
})
export class DatatablesService {
	callToServiceMethodSource = new Subject<any>();

	private baseUrl = '/api/datasource';
	public selectedJsonFile;

	constructor(
		private http: HttpClient,
		private dataTableConfig: DatatableConfig,
		private translate: TranslateService
	) { }

	cssClasses = {
		sortAscending: 'fas fa-long-arrow-up-alt',
		sortDescending: 'fas fa-long-arrow-down-alt',
		pagerLeftArrow: 'fa fa-angle-left',
		pagerRightArrow: 'fa fa-angle-right',
		pagerPrevious: 'fas fa-angle-double-left',
		pagerNext: 'fas fa-angle-double-right',
	};

	pageLengths = [
		{ id: 10, count: '10' },
		{ id: 20, count: '20' },
		{ id: 50, count: '50' },
		{ id: 100, count: '100' },
		{ id: 200, count: '200' },
		{ id: 500, count: '500' },
	];

	getTableMsgs() {
		return {
			// Message to show when array is presented
			// but contains no values
			emptyMessage: this.translate.instant('NODATA'),

			// Footer total message
			totalMessage: this.translate.instant('TOTAL'),

			// Footer selected message
			selectedMessage: this.translate.instant('SELECTED'),
		};
	}

	callServiceCmpMethod(langType) {
		// this.translateDataTables(langType);
		this.callToServiceMethodSource.next(this.selectedJsonFile);
	}

	// translateDataTables(langType) {
	// 	// fetching the right translation of dataTables
	// 	switch (langType) {
	// 		case 'en':
	// 			this.selectedJsonFile = this.enJson;
	// 			break;
	// 		case 'dr':
	// 			this.selectedJsonFile = this.drJson;
	// 			break;
	// 		case 'ps':
	// 			this.selectedJsonFile = this.psJson;
	// 			break;
	// 		default:
	// 			this.selectedJsonFile = this.enJson;
	// 			break;
	// 	}
	// }

	parseDatatableData(self, datatableOptions, data) {
		let service = this;
		data.forEach((row) => {
			for (let column of datatableOptions.columns) {
				if (column.hasOwnProperty('render')) {
					row[column.name] = eval(column['render']);
				}
			}
		});
		return data;
	}

	getColumnsArray(datatableOptions) {
		let columns = [];
		if (datatableOptions != null && datatableOptions.columns.length > 0) {
			datatableOptions.columns.forEach((col) => {
				if (col.visible != false) {
					columns.push({
						id: col.data,
						name: col.name,
						type: col.type,
						translate: col.translate,
						search: col.search,
						display: col.display,
						orderable: col.orderable,
						visible: col.visible
					});
				}
			});
		}
		return columns;
	}

	searchColumn(datatableOptions, index, searchTerm) {
		datatableOptions.columns[index].search.value = searchTerm;
		return datatableOptions;
	}

	getColumnIndex(datatableOptions, propertyName) {
		return datatableOptions.columns.findIndex(x => x.name === propertyName);
	}

	orderColumn(datatableOptions, index) {
		let orderType = 'asc';
		if (
			datatableOptions['order'][0]['column'] === index &&
			datatableOptions['order'][0]['dir'] === 'asc'
		) {
			orderType = 'desc';
		}
		datatableOptions['order'] = [{ column: index, dir: orderType }];
		return datatableOptions;
	}

	getTableConfig(t) {
		return this.dataTableConfig.getTableOptions(t);
	}
}
