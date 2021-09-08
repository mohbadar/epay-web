import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseUrl = '/api/transport/vehicles';
  serviceTypes=null;

constructor(private http: HttpClient) { }

  getServiceTypes() {
      if (!this.serviceTypes) {
          return this.http.get("/api/transport/service_types").pipe(
              map((data: any) => {
                  return this.serviceTypes = data;
              })
          );
      } else {
          return of(this.serviceTypes);
      }
  }

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
}
