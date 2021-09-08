import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DecreeDocumentTypeService {
    private baseUrl = '/api/decree-document-types';

    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get(`${this.baseUrl}/all`);
    }

}