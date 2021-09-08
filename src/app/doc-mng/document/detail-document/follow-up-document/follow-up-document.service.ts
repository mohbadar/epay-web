import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FileDownloadService } from './../../../../services/file-download.service';

@Injectable({
	providedIn: 'root'
})
export class FollowUpDocumentService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/doc_mng/document_followups';
	private docActivityBaseUrl = '/api/doc_mng/doc-followup-activities';

	constructor(private http: HttpClient, private fileDownloadService: FileDownloadService) { }

	getFollowList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}

	getFollowUp(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	getFollowUpDetails(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/details/${id}`);
	}

	getFollowUpByDocument(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/document`, {
			params: { pId }
		});
	}


	addFollowUp(data) {
        return this.http.post(`${this.baseUrl}/create`, data);
    }

	editFollowUp(id:number, data) {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

	deleteFollowUp(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getFollowUpCountByType(pId): Observable<any> {
		return this.http.get(`${this.baseUrl}/count`, {
			params: { pId }
		});;
	}

    getFollowUpTypes(){
        return this.http.get(`/api/doc_mng/document_followup_types`);
    }

	getFollowUpStatues(){
        return this.http.get(`/api/doc_mng/document_followup_statuses`);
    }

	downloadAttachment(id) {
        this.fileDownloadService.download(`${this.baseUrl}/downloadFile/${id}`, 'GET');
    }

	assignUsers(docId, data) {
		return this.http.post(`${this.baseUrl}/assign-users/${docId}`, null, {
			params: data
		});
	}

	assignUser(docId, data) {
		return this.http.post(`${this.baseUrl}/assign-user/${docId}`, null, {
			params: data
		});
	}

	getDocFollowUpActivityDetails(id) {
		return this.http.get(`${this.docActivityBaseUrl}/${id}`);
	}

	createDocFollowUpActivity(data) {
		return this.http.post(`${this.docActivityBaseUrl}`, data);
	}

	updateDocFollowUpActivity(id, data) {
		return this.http.put(`${this.docActivityBaseUrl}/${id}`, data);
	}

	deleteDocFollowUpActivity(id) {
		return this.http.delete(`${this.docActivityBaseUrl}/${id}`);
	}

	downloadDocActivityAttachment(id) {
        this.fileDownloadService.download(`${this.docActivityBaseUrl}/download-file/${id}`, 'GET');
    }

	finalizeDocFollowUpActivity(id) {
		return this.http.put(`${this.docActivityBaseUrl}/finalize/${id}`, null);
	}

	updateDueDate(id, dueDate) {
		return this.http.put(`${this.baseUrl}/due-date/${id}`, null, {
			params: {
				dueDate
			}
		});
	}
}
