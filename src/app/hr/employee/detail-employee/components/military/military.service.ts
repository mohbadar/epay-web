import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class MilitaryService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/militaryservices';

	constructor(private http: HttpClient) { }

	getMilitaryList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getMilitaryServie(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getMilitaryByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addMilitary(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editMilitary(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteMilitary(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
	
}