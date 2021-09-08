// <<<<<<< Updated upstream
// import { Observable } from 'rxjs';
// =======
// import { Observable } from "rxjs/internal/Observable";
// >>>>>>> Stashed changes
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileDownloadService } from "./file-download.service";

@Injectable({
  providedIn: "root",
})
export class ComplaintService {
  private baseUrl = "/api/complaints";

  constructor(
          private http: HttpClient,
          private fileDownloadService: FileDownloadService
          ) {}

  createComplaint(obj: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, obj);
  }

  getComplaints() {
    return this.http.get(`${this.baseUrl}`);
  }

  getRecordList(data, filters) {
    return this.http.post(`${this.baseUrl}/list`, {
        input: data,
        filters: filters
    });
  }


  getComplaintById(id) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateComplaintById(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  getComplaintDocsType(){
    return this.http.get(`/api/complaintdocstype`);
  }

  uploadComplaintDocuments(id, fileType, fileData) {
    const file: FormData = new FormData();
    file.append('file', fileData);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload/complaint-documents/${id}/${fileType}`, file, {
      reportProgress: true,
      responseType: 'blob',
    });

    return this.http.request(req);
  }

  getAllFileNames(id) {
    return this.http.get(`${this.baseUrl}/filenames/${id}`);
  }

  downloadFile(id, fileType){
    console.log(`Printing ${fileType}`);
    return this.fileDownloadService.downloadFile(`${this.baseUrl}/download-file/${id}/${fileType}`);
  }

  deleteFile(id, fileType){
    console.log(`Deleting ${fileType}`);
    return this.http.delete(`${this.baseUrl}/delete-file/${id}/${fileType}`);
  }

  deleteRecord(id){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
