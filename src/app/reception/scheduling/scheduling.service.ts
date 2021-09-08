import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {
	private baseUrl = '/api/receptions/scheduling';

  	constructor(private http: HttpClient) { }

	getScheduleVisitList(data, filters, interval) {
		return this.http.post(`${this.baseUrl}/visits/list/${interval}`, {
			input: data,
			filters: filters
		});
	}

	getScheduleVisitorList(data, filters, interval) {
		return this.http.post(`${this.baseUrl}/visitors/list/${interval}`, {
			input: data,
			filters: filters
		});
	}

	getScheduleVehicleList(data, filters, interval) {
		return this.http.post(`${this.baseUrl}/vehicles/list/${interval}`, {
			input: data,
			filters: filters
		});
	}
}
