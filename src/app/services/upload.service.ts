import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Province } from '../models/province';


@Injectable({
    providedIn: 'root'
})
export class UploadService {

    private baseURL = '/api/files';

    constructor(private http: HttpClient) { }

    uploadPhoto(data): Observable<HttpEvent<any>> {
        const req = new HttpRequest('POST', `${this.baseURL}/photo`, data, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }


}
