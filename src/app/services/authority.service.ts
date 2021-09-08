import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {
    private baseUrl = '/api/authorities';

      constructor(private http: HttpClient) { }
    
    getAuthorities() {
        return this.http.get(`${this.baseUrl}`);
    }
  
    createAuthority(value: any): Observable<Object> {
      return this.http.post(`${this.baseUrl}`, value);
    }

    getAuthorityById(id: number): Observable<Object> {
      return this.http.get(`${this.baseUrl}/${id}`);
    }

    updateAuthorityById(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteRecord(id){
      return this.http.delete(`${this.baseUrl}/${id}`);
    }
    
}