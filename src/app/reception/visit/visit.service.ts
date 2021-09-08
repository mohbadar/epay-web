import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
	// private baseUrl = environment.apiUrl+'reception/visits';
	private baseUrl = '/api/reception/visits';
  language;

  	constructor(private http: HttpClient, private fileDownloadService: FileDownloadService) { }

	getRecordList(data, filters, isSchedule) {
		if(isSchedule) {
			return this.http.post(`${this.baseUrl}/schedules/list`, {
				input: data,
				filters: filters
			});
		} else {
			return this.http.post(`${this.baseUrl}/list`, {
				input: data,
				filters: filters
			});
		}
	}

	getMyRecordList(data, filters) {
		return this.http.post(`${this.baseUrl}/my_list`, {
			input: data,
			filters: filters
		});
	}

    addRecord(data, isSchedule) {
		if(isSchedule) {
			return this.http.post(`${this.baseUrl}/schedules`, data);
		} else {
			return this.http.post(`${this.baseUrl}`, data);
		}
    }

    editRecord(id, data) {
        return this.http.post(`${this.baseUrl}/${id}/edit`, data);
    }

    getRecordById(id) {
        return this.http.get(`${this.baseUrl}/${id}`)
    }

	uploadImage(image){
		return this.http.post(`${this.baseUrl}/uploader/`, image);
	}

	uploadExcel(data) {
		return this.http.post(`${this.baseUrl}/excel_upload/`, data);
	}

	getExcelTemplate() {
		let headers = new HttpHeaders();
		headers = headers.append('Accept', 'blob ; charset=utf-8');
		return this.http.get(`${this.baseUrl}/excel_template`, {
			headers: headers,
			observe: 'response',
			responseType: 'blob'
		});
	}

  printMyVisitsList(id){
    this.language = localStorage.getItem('lang');
    console.log(this.language);
    return this.fileDownloadService.downloadFile(`${this.baseUrl}/print/${id}/${this.language}`);
  }


}
