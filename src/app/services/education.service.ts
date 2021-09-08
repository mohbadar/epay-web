import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { District } from '../models/district';
 
@Injectable({
	providedIn: 'root'
})
export class EducationService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/educations';

	constructor(private http: HttpClient) { }

	getEducationList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getEducation(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getEducationByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}
	
	findByProfilejob(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profilejob`, {
			params: { pId }
		});
	}

	addEducation(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editEducation(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteEducation(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
    getEducationLevel(){
        return this.http.get(`/api/educationlevels`); 
    }

	getEductionLog(id: number): Observable<any> {
		return this.http.get(`${this.baseUrl}/${id}/history`);
	}
	
}