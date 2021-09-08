import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class TravelService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/travels';

	constructor(private http: HttpClient) { }

	getTravelList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getTravel(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getTravelByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addTravel(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editTravel(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteTravel(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
	
}