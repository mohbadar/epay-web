import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { District } from '../models/district';
 
@Injectable({
	providedIn: 'root'
})
export class PublicationService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/publications';

	constructor(private http: HttpClient) { }

	getPublicationList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getPublication(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getPublicationByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addPublication(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editPublication(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deletePublication(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
    getPublicationType(){
        return this.http.get(`/api/publicationtypes`); 
    }
	
}