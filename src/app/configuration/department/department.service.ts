import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
    private baseUrl = '/api/_admin/departments';
    ministries;
    departments;

    constructor(private http: HttpClient) { }
    
    getRecordList(data, filters) {
      return this.http.post(`${this.baseUrl}/list`, {
        input: data,
        filters: filters
      });
    }
    
    getList() {
        return this.http.get(`${this.baseUrl}`);
    }
  
    createRecord(value: any): Observable<Object> {
      return this.http.post(`${this.baseUrl}`, value);
    }

    getRecordById(id: number): Observable<Object> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }

    updateRecordById(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteRecord(id){
      return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getDepartments(): Observable<any> {
      if (!this.departments) {
        return this.http.get(`${this.baseUrl}`).pipe(
          map((data: any) => {
            return this.departments = data;
          })
        );
      } else {
        return of(this.departments);
      }
    }
  
    getDepartmentsByMinistryId(ministryId) {
      // this.departments;
      return this.ministries;
    }
    
}