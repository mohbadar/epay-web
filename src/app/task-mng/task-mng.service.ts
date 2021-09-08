import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskMngService {
	private baseUrl = '/api/task_mng';
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
    return this.http.get(`${this.baseUrl}/dashboard/count`);
    }

    getTaskCountByTaskBoard(): Observable<any> {
      return this.http.get(`/api/task_mng/dashboard/taskboard`);
      }

      getTaskCountByStatus(): Observable<any> {
      return this.http.get(`/api/task_mng/dashboard/status`);
      }



}
