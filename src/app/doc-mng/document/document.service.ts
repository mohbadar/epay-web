import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    private baseUrl = '/api/doc_mng/documents';
    private documentExecutionBaseUrl = "/api/doc_mng/document-execution";

    constructor(private http: HttpClient, private fileDownloadService: FileDownloadService,) { }

    getRecordList(data, filters) {
        return this.http.post(`${this.baseUrl}/list`, {
            input: data,
            filters: filters
        });
    }

    getFollowupRecordList(data, filters) {
        return this.http.post(`${this.baseUrl}/followup_list`, {
            input: data,
            filters: filters
        });
    }

    addRecord(data) {
        return this.http.post(`${this.baseUrl}`, data);
    }

    editRecord(id, data) {
        return this.http.put(`${this.baseUrl}/${id}/edit`, data);
    }

    evaluateDocument(id, data) {
        return this.http.put(`${this.baseUrl}/${id}/evaluate`, data);
    }

    updateDocumentReviewDecision(reviewId, data) {
        return this.http.put(`${this.baseUrl}/reviews/${reviewId}`, data);
    }

    resetDocumentReviewDecision(reviewId, data) {
        return this.http.put(`${this.baseUrl}/reviews/${reviewId}/reset`, data);
    }

    getRecordById(id) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    getRecordQRCode(docId, width, height) {
        return this.http.get(`/api/public/documents/${docId}/genQRCode/${width}/${height}`, { responseType: 'blob' });
    }

    setDocStatusExecuted(docId, data) {
        return this.http.put(`${this.baseUrl}/${docId}/executed`, data);
    }

    finalizeDocStatus(docId, data) {
        return this.http.put(`${this.baseUrl}/${docId}/finalize`, data);
    }

    receivingDocument(docId, receiveId, data) {
        return this.http.put(`${this.baseUrl}/${docId}/receive/${receiveId}`, data);
    }

    addComment(id, data) {
        return this.http.post(`${this.baseUrl}/${id}/comments`, data);
    }

    getRecordComments(id) {
        return this.http.get(`${this.baseUrl}/${id}/comments`)
    }

    addExecution(documentId, data) {
        return this.http.post(`${this.baseUrl}/${documentId}/executions`, data);
    }

    getRecordExecutions(documentId) {
        return this.http.get(`${this.baseUrl}/${documentId}/executions`);
    }

    getRecordExecutionById(id) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    updateExecution(documentId, execId, data) {
        return this.http.put(`${this.baseUrl}/${documentId}/executions/${execId}/edit`, data);
    }

    removeRecordExecutions(id) {
        return this.http.delete(`${this.documentExecutionBaseUrl}/remove/${id}`);
    }

    updateExecutionReviewDecision(documentId, reviewId, data) {
        return this.http.put(`${this.baseUrl}/${documentId}/executions/reviews/${reviewId}`, data);
    }

    finalizeExecutionStatus(documentId, execId, data) {
        return this.http.put(`${this.baseUrl}/${documentId}/executions/${execId}/finalize`, data);
    }

    receivingExecution(documentId, execId, receiveId, data) {
        return this.http.put(`${this.baseUrl}/${documentId}/executions/${execId}/receive/${receiveId}`, data);
    }

    printDocumentExecution(documentId, execId) {
        return this.fileDownloadService.downloadFile(`${this.baseUrl}/${documentId}/executions/${execId}/print`);
    }

    printDocument(id) {
        return this.fileDownloadService.downloadFile(`${this.baseUrl}/${id}/print`);
    }

    getTemplate(docTypeId, entityId) {
        return this.http.get(`/api/doc_mng/document_type_templates/docType/${docTypeId}/entity/${entityId}`);
    }

    uploadDocumentAttachment(documentId, fileName, file) {
        const req = new HttpRequest('POST', `/api/doc_mng/document-attachments/upload-file/${documentId}/${fileName}`, file, {
            reportProgress: true,
            responseType: 'blob',
        });

        return this.http.request(req);
    }

    getDocumentAttachments(documentId) {
        return this.http.get(`/api/doc_mng/document-attachments/${documentId}`);
    }

    deleteDocumentAttachment(documentAttachmentId) {
        return this.http.delete(`/api/doc_mng/document-attachments/delete/${documentAttachmentId}`);
    }

    getDocumentStatuesList() {
        return this.http.get(`/api/doc_mng/document_statuses`);
    }

    isOwner(document, authService) {
        if (document.createdBy.username === authService?.principal.username) {
            return true;
        }
        return false;
    }

    isReceiver(receive, authService) {
        console.log("isReceive");
        if (receive) {
            if (receive.department?.id == authService?.principal.departmentId) {
                return true;
            }
            if (authService?.principal.accessableDepartments.includes(receive.department?.id)) {
                return true;
            }
        }
        return false;
    }

    hasPendingReview(reviews) {
		if (reviews) {
            for (const review of reviews) {
                if(!review.decision && !review.reviewedAt) {
                    return true;
                }
            }
        }
		return false;
	}

    getDocumentCount(): Observable<any> {
        return this.http.get(`${this.baseUrl}/count`);
    }

    addNotHukm(id, data) {
        return this.http.put(`${this.documentExecutionBaseUrl}/notehukm/${id}`, data);
    }

    findInvalidControls(form) {
		const invalid = [];
		const controls = form.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		console.log(invalid);
		return invalid;
	}
}
