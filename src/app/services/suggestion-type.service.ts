import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SuggestionTypeService {
    private baseUrl = '/api/suggestion-types';

    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get(`${this.baseUrl}/all`);
    }

}