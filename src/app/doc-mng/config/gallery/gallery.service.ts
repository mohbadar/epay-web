import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private baseUrl = '/api/doc_mng/document_gallery';

  constructor(private http: HttpClient) { }

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
    return this.http.put(`${this.baseUrl}/${id}/edit`, data);
  }

  getRecordById(id) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  uploadImage(fileName, file) {
    const req = new HttpRequest('POST', `${this.baseUrl}/upload-file/${fileName}`, file, {
      reportProgress: true,
      responseType: 'blob',
    });

    return this.http.request(req);
  }

  getImage(imageId) {
    return this.http.get(`${this.baseUrl}/download-image/${imageId}`, { responseType: 'blob' });
  }

  deleteRecord(recordId) {
    return this.http.delete(`${this.baseUrl}/delete/${recordId}`);
  }

  updateImage(imageId, fileName, file) {
    const req = new HttpRequest('POST', `${this.baseUrl}/update-image/${imageId}/${fileName}`, file, {
      reportProgress: true,
      responseType: 'blob',
    });

    return this.http.request(req);
  }
}
