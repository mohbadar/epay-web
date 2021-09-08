import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';

@Injectable({
    providedIn: 'root'
})
export class DraftDocumentService {
    private baseUrl = '/api/doc_mng/draft';

    constructor(private http: HttpClient, private fileDownloadService: FileDownloadService,) { }

    getMyDocumentsList(data, filters) {
        return this.http.post(`${this.baseUrl}/documents/list`, {
            input: data,
            filters: filters
        });
    }

    getMyExecutionsList(data, filters) {
        return this.http.post(`${this.baseUrl}/executions/list`, {
            input: data,
            filters: filters
        });
    }

}
