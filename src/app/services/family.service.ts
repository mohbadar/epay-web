import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { District } from '../models/district';
 
@Injectable({
	providedIn: 'root'
})
export class FamilyService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/familymembers';

	constructor(private http: HttpClient) { }

	getFamilyList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getFamilyMember(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getFamilyMemberByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addFamilyMember(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editFamilyMember(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteFamilyMember(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
	
}