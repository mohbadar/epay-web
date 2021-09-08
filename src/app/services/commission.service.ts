import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
    private baseUrl = '/api/commissions';

    constructor(private http: HttpClient) { }
    
    getCommissions() {
        return this.http.get(`${this.baseUrl}`);
    }

    createCommission(value: any): Observable<Object> {
      return this.http.post(`${this.baseUrl}`, value);
    }

    getCommissionById(id: number): Observable<Object> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }

    updateCommissionById(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteRecord(id){
      return this.http.delete(`${this.baseUrl}/${id}`);
    }
    
}