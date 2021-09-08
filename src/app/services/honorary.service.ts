import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { District } from '../models/district';
 
@Injectable({
	providedIn: 'root'
})
export class HonoraryService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/hononaryservices';

	constructor(private http: HttpClient) { }

	getHonoraryList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getHonorary(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getHonoraryByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addHonorary(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editHonorary(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteHonorary(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
	
}