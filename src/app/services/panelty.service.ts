import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class PaneltyService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/panelties';

	constructor(private http: HttpClient) { }

	getPaneltyList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getPanelty(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getPaneltyByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addPanelty(data){ 
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editPanelty(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deletePanelty(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
    getPaneltyType(){
        return this.http.get(`/api/paneltytypes`); 
    }
	
}