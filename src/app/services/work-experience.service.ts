import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WorkExperienceService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = 'api/initialprofilejob';

	constructor(private http: HttpClient) { }

	getJobByProfile(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/profile`, {
			params: { pId }
		});
	}

	
    
	
}