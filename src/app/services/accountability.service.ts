import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class AccountabilityService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/accountabilities';

	constructor(private http: HttpClient) { }

	getAccountabilityList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getAccountability(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getAccountabilityByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addAccountability(data){ 
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editAccountability(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteAccountability(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
	
}