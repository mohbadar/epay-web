import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TrainingService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/trainings';

	constructor(private http: HttpClient) { }

	getTrainingList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getTraining(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getTrainingByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	addTraning(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editTraining(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteTraining(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }

	getTrainingLog(id: number): Observable<any> {
		return this.http.get(`${this.baseUrl}/${id}/history`);
	}
    
	
}