import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Province } from '../models/province';


@Injectable({
	providedIn: 'root'
})
export class ProvinceService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/provinces';
	private permissionUrl = '/api/permissions';

	constructor(private http: HttpClient) { }

	getProvincesList(): Observable<any> {
		return this.http.get(`${this.baseUrl}/get`);
	}

	getProvince(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getProvinceByCountry(cId): Observable<any> {
		return this.http.get(`${this.baseUrl}/country`, {
			params: { cId }
		});
    }

	createProvince(data) {
		return this.http.post(`${this.baseUrl}/create`, data);
	}

	updateProvince(id: number, data): Observable<Object> {
	 console.log("in the update method the role is:"+JSON.stringify(data));
		return this.http.put(`${this.baseUrl}/${id}`, data);
	}

	deleteProvince(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}
}
