import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { District } from '../models/district';
 
@Injectable({
	providedIn: 'root'
})
export class MedicalService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/medicalreports';

	constructor(private http: HttpClient) { }

	getMedicalList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getMedical(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getMedicalByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addMedical(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editMedical(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteMedical(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
	
}