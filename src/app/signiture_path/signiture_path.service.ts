import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SigniturePathService {
    private baseUrl = '/api/users';

  	constructor(private http: HttpClient) { }

  	getResignationList(data, filters) {
        return this.http.post(`${this.baseUrl}/list`, {
            input: data,
            filters: filters
        });
    }

    addResignation(data) {
        return this.http.post(`${this.baseUrl}`, data);
    }

    editResigntion(id, data) {
        return this.http.post(`${this.baseUrl}/${id}`, data);
    }

    getResignationById(id) {
        return this.http.get(`${this.baseUrl}/${id}`)
    }

}
