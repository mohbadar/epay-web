import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class PoliticalPartyService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/politicalparties';

	constructor(private http: HttpClient) { }

	getPartyList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getParty(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getPartyByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addParty(data){ 
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editParty(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteParty(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
	
}