import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class RetirmentService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/profileretirement';

	constructor(private http: HttpClient) { }

	getRetirementList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getRetirement(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getRetirementByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}
	

	addRetirement(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editEditRetirement(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteRetirement(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
    getRetirementType(){
        return this.http.get(`/api/profileretirementtypes`); 
    }
	
}