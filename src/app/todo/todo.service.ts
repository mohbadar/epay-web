import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
	private baseUrl = '/api/todos';
	constructor(private http: HttpClient) { }

	getMyTodos() {
		return this.http.get(`${this.baseUrl}/list`);
	}

	addRecord(data) {
		return this.http.post(`${this.baseUrl}`, data);
	}

	updateRecord(id, data) {
		return this.http.put(`${this.baseUrl}/${id}`, data);
	}

	deleteRecord(id) {
		return this.http.delete(`${this.baseUrl}/${id}`);
	}

	getRecordById(id) {
		return this.http.get(`${this.baseUrl}/${id}`)
	}

	completed(id) {
		return this.http.get(`${this.baseUrl}/${id}/done`)
	}

	archive(id) {
		return this.http.get(`${this.baseUrl}/${id}/archive`)
	}
}
