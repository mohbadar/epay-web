import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { FileDownloadService } from './file-download.service';

@Injectable({
    providedIn: 'root'
})
export class DocumentProfileService {

    // private baseUrl = environment.apiUrl;
    private baseUrl = '/api/documentuploads';

    constructor(private http: HttpClient, private fileDownloadService: FileDownloadService) { }


    getDocument(id: number): Observable<Object> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    getDocumentByProfile(pId): Observable<any> {
        return this.http.get(`${this.baseUrl}/profile`, {
            params: { pId }
        });
    }

    addDocument(data): Observable<HttpEvent<any>> {
        const req = new HttpRequest('POST', `${this.baseUrl}/document`, data, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }

    deleteDocument(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }

    getDocumentType(): Observable<any> {
        return this.http.get(`/api/documentuploadtypes`);
    }
    

    downloadAttachment(id) {
        this.fileDownloadService.download(`${this.baseUrl}/downloadFile/${id}`, 'GET');
    }

}