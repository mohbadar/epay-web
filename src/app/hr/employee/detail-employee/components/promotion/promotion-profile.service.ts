import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class PromotionProfileService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/profilepromotions';

	constructor(private http: HttpClient) { }

	getPromotionList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getPromotion(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getPromotionByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	getLastestPromotionByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/promotion`, {
			params: { pId }
		});
	}

	addPromotion(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editPromotion(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deletePromotion(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }

	getPromotionType(){
        return this.http.get(`/api/profilepromotiontypes`); 
    }
	
}