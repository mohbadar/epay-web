import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class TransferService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/transfers';

	constructor(private http: HttpClient) { }

	getTransferList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getTransfer(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getTransferByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addTransfer(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editTransfer(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteTransfer(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
	
}