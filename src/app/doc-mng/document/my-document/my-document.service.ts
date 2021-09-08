import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MyDocumentService {
    private baseUrl = '/api/doc_mng/my';

    constructor(private http: HttpClient, private fileDownloadService: FileDownloadService) { }

    getMyDocumentsList(data, filters) {
        console.log("🚀 ~ file: my-document.service.ts ~ line 15 ~ MyDocumentService ~ getMyDocumentsList ~ filters", filters)
        return this.http.post(`${this.baseUrl}/documents/list`, {
            input: data,
            filters: filters
        });
    }

    getMyFollowupsList(data, filters) {
        return this.http.post(`${this.baseUrl}/followups/list`, {
            input: data,
            filters: filters
        });
    }

    getMyCommentsList(data, filters) {
        return this.http.post(`${this.baseUrl}/comments/list`, {
            input: data,
            filters: filters
        });
    }

    getMyDocumentCount(): Observable<any> {
        return this.http.get(`${this.baseUrl}/documents/count`);
    }



}
