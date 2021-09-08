import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
	private baseUrl = '/api/transport/requests';
    serviceTypes=null;
    language;

	constructor(private http: HttpClient, private fileDownloadService: FileDownloadService) { }

    getServiceTypes() {
        if (!this.serviceTypes) {
            return this.http.get("/api/transport/service_types").pipe(
                map((data: any) => {
                    return this.serviceTypes = data;
                })
            );
        } else {
            return of(this.serviceTypes);
        }
    }

    getMyRecordList(data, filters) {
		return this.http.post(`${this.baseUrl}/my_list`, {
			input: data,
			filters: filters
		});
    }

    getRecordList(data, filters) {
		return this.http.post(`${this.baseUrl}/list`, {
			input: data,
			filters: filters
		});
    }

	getClosedRecordList(data, filters) {
		return this.http.post(`${this.baseUrl}/list/closed`, {
			input: data,
			filters: filters
		});
    }

    getPendingRecordList(data, filters) {
		return this.http.post(`${this.baseUrl}/list/pending`, {
			input: data,
			filters: filters
		});
    }

	addRecord(data) {
        return this.http.post(`${this.baseUrl}`, data);
    }

    cancelRequest(id, data) {
        return this.http.put(`${this.baseUrl}/${id}/cancel`, data);
    }

    processRequest(id, data) {
        return this.http.put(`${this.baseUrl}/${id}/process`, data);
    }

    editRecord(id, data) {
        return this.http.put(`${this.baseUrl}/${id}/edit`, data);
    }

    getRecordById(id) {
        return this.http.get(`${this.baseUrl}/${id}`)
    }

    printRequest(id){
      this.language = localStorage.getItem('lang');
      console.log(this.language);
      return this.fileDownloadService.downloadFile(`${this.baseUrl}/print/${id}/${this.language}`);
    }

}
