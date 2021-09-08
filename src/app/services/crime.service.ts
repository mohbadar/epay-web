import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { District } from '../models/district';
 
@Injectable({
	providedIn: 'root'
})
export class CrimeService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/personalcrimes';

	constructor(private http: HttpClient) { }

	getCrimeList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getCrime(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getCrimeByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addCrime(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editCrime(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteCrime(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
	
}