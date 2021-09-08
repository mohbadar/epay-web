import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { District } from '../models/district';

@Injectable({
	providedIn: 'root'
})
export class DistrictService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/districts';
	private permissionUrl = '/api/permissions';

	constructor(private http: HttpClient) { }

	getDistrictsList(): Observable<any> {
		return this.http.get(`${this.baseUrl}/get`);
	}

	getDistrict(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getDistrictByProvince(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/province`, {
			params: { pId }
		});
	}


	createDistrict(data) {
		return this.http.post(`${this.baseUrl}/create`, data);
	}

	updateDistrict(id: number, data): Observable<Object> {
		return this.http.put(`${this.baseUrl}/${id}`, data);
	}

	deleteDistrict(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}

}
