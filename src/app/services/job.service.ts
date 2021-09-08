import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class JobService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/jobs';

	constructor(private http: HttpClient) { }

  getJobs(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}

	getJobsList(): Observable<any> {
		return this.http.get(`${this.baseUrl}/get`);
	}

	getJob(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	createJob(obj: Object): Observable<Object> {
		return this.http.post(`${this.baseUrl}`, obj);
	}

	updateJob(id: number,  value: any): Observable<Object> {
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	deleteJob(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}

}
