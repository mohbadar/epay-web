import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProposalDocumentTypeService {
    private baseUrl = '/api/proposal-document-types';

    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get(`${this.baseUrl}/all`);
    }

}