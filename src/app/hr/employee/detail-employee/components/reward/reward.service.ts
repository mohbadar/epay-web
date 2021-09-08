import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class RewardService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/rewards';

	constructor(private http: HttpClient) { }

	getRewardList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getReward(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getRewardByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addReward(data){ 
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editReward(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteReward(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    
    getRewardType(){
        return this.http.get(`/api/rewardtypes`); 
    }

	getRewardLog(id: number): Observable<any> {
		return this.http.get(`${this.baseUrl}/${id}/history`);
	}
	
}