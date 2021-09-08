import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ministry } from 'app/configuration/ministry/ministry';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MinistryService {
    private baseUrl = '/api/ministries';

      constructor(private http: HttpClient) { }
      
      getMinistries(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
      }
    
      createMinistry(value: Ministry): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, value);
      }

      getMinistryById(id: number): Observable<Object> {
        return this.http.get(`${this.baseUrl}/${id}`);
      }

      updateMinistry(id: number, value: Ministry): Observable<Object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
      }

      deleteRecord(id){
        return this.http.delete(`${this.baseUrl}/${id}`);
      }
      
}