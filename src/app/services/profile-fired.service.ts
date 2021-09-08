import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class ProfileFiredService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/profilefired';

	constructor(private http: HttpClient) { }

	getFiredList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getFired(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getFiredByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addFired(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editFired(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteFired(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}
	
	getFiredType(){
        return this.http.get(`/api/profilefiredtypes`); 
    }
    
	
}