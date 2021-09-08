import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Status } from '../models/status';
 
@Injectable({
	providedIn: 'root'
})
export class StatusService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/status';

	constructor(private http: HttpClient) { }

	getStatusList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getStatus(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	createStatus(obj: Object): Observable<Object> {
		return this.http.post(`${this.baseUrl}`, obj);
	}

	updateStatus(id: number, value: Status): Observable<Object> {
	 console.log("in the update method the role is:"+JSON.stringify(value));
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	deleteStatus(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}
}
