import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PromotionType } from '../models/promotion_type';
 
@Injectable({
	providedIn: 'root'
})
export class PromotionTypeService  {

	// private baseUrl = environment.apiUrl; 
	private baseUrl = '/api/promotion-type';
	private permissionUrl = '/api/permissions';

	constructor(private http: HttpClient) { }

	getPromotionTypeList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getPromotionType(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	

	createPromotionType(obj: Object): Observable<Object> {
		return this.http.post(`${this.baseUrl}`, obj);
	}

	updatePromotionType(id: number, value: PromotionType): Observable<Object> {
	 console.log("in the update method the role is:"+JSON.stringify(value));
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	deletePromotionType(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}
	
}
