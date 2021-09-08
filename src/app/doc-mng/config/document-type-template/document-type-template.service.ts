import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeTemplateService {
	private baseUrl = '/api/doc_mng/document_type_templates';

	constructor(private http: HttpClient, private fileDownloadService: FileDownloadService,) { }

	getRecordList(data, filters) {
		return this.http.post(`${this.baseUrl}/list`, {
			input: data,
			filters: filters
		});
  }

	addRecord(data) {
        return this.http.post(`${this.baseUrl}`, data);
    }

    editRecord(id, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

    getRecordById(id) {
        return this.http.get(`${this.baseUrl}/${id}`)
    }

    printDocument(id){
      return this.fileDownloadService.downloadFile(`${this.baseUrl}/${id}/print`);
    }
}
