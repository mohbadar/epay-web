import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
	providedIn: 'root'
})
export class CountryService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/countries';

	constructor(private http: HttpClient) { }

	getCountrysList(): Observable<any> {
		return this.http.get(`${this.baseUrl}/get`);
	}

	getCountry(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	createCountry(obj: Object): Observable<Object> {
		return this.http.post(`${this.baseUrl}`, obj);
	}

	updateCountry(id: number,  value: any): Observable<Object> {
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	deleteCountry(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}

}
