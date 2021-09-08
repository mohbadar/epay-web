import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { District } from '../models/district';
 
@Injectable({
	providedIn: 'root'
})
export class MedalService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/marksandmedals';

	constructor(private http: HttpClient) { }

	getMedalList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getMedal(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getMedalByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addMedal(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editMedal(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteMedal(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
	
}