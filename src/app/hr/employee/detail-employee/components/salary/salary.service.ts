import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class SalaryService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/salaries';

	constructor(private http: HttpClient) { }

	getSalaryList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getSalary(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getSalaryByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addSalary(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editSalary(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteSalary(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
	
}