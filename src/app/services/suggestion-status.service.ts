import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SuggestionStatusService {
    private baseUrl = '/api/suggestion-statuses';

    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get(`${this.baseUrl}/all`);
    }

}