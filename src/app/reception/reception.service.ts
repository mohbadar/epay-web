import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {
	private baseUrl = '/api/receptions';
	private schedulingBaseUrl = '/api/reception/scheduling';

  	constructor(private http: HttpClient) { }

  	getRecordList(data, filters) {
        return this.http.post(`${this.baseUrl}/list`, {
            input: data,
            filters: filters
        });
    }

    addRecord(data) {
        return this.http.post(`${this.baseUrl}/add`, data);
    }

    editRecord(id, data) {
        return this.http.post(`${this.baseUrl}/${id}`, data);
    }

    getRecordById(id) {
        return this.http.get(`${this.baseUrl}/${id}`)
    }

    getDashboardCount(): Observable<any> {
		return this.http.get(`/api/reception/dashboard/count`);
    }

    getVisitCountByDepartment(): Observable<any> {
		return this.http.get(`/api/reception/dashboard/department`);
    }

    getVisitCountByType(): Observable<any> {
		return this.http.get(`/api/reception/dashboard/visittype`);
    }

	getScheduleVisitList(data, filters) {
		return this.http.post(`${this.schedulingBaseUrl}/visits/list`, {
			input: data,
			filters: filters
		});
	}
}
