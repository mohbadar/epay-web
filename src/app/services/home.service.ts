import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class HomeService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/homes';

	constructor(private http: HttpClient) { }

	getHomeCount(): Observable<any> {
		return this.http.get(`${this.baseUrl}/count`);
    }
    
    getProfileByEthnic(): Observable<any> {
		return this.http.get(`${this.baseUrl}/ethnic`);
    }
    
    getProfileByGender(): Observable<any> {
		return this.http.get(`${this.baseUrl}/gender`);
	}
 
	
	
}