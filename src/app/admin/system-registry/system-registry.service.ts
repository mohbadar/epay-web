import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SystemRegistryService {
    // private baseUrl = environment.apiUrl;
    private baseUrl = '/api/sys_reg';

    constructor(private http: HttpClient) {}

    getSysRegsList(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }

    getSysReg(id: number): Observable<Object> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    getSystemRegistryContentByName(name: string): Observable<Object> {
        return this.http.get(`${this.baseUrl}/${name}/content`);
    }

    createSysReg(obj: Object): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, obj);
    }

    updateSysReg(id: number, value: any): Observable<Object> {
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }


	getDashboard(slug: string): Observable<Object> {
		return this.http.get<String>(`${this.baseUrl}/${slug}/dashboard`);
    }
    
	getQueryData(slug: string, arrayList?: string[]): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/${slug}/query`, {
            responseType: 'json',
            params : {
                arrayList: arrayList
            }
        });
	}
}
