import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
	// private baseUrl = environment.apiUrl+'reception/visitors';
	private baseUrl = '/api/reception/visitors';

	constructor(private http: HttpClient) { }

	getRecordList(data, filters) {
		return this.http.post(`${this.baseUrl}/list`, {
			input: data,
			filters: filters
		});
    }

	addRecord(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

    editRecord(id, data) {
        return this.http.post(`${this.baseUrl}/${id}/edit`, data);
    }

    getRecordById(id) {
        return this.http.get(`${this.baseUrl}/${id}`)
    }

    processRecord(visitId, visitorId, data) {
        return this.http.put(`${this.baseUrl}/process/${visitId}/${visitorId}`, data);
    }
}
