import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocMngService {
	documenttypes = null;
	documentExecutionTypes = null;
	myFinalizedDocuments = null;
	moduleUsers = null;
	documentNoteTypes = null;
	securityLevels = [
		{ "id": "NORMAL", "name": "NORMAL"},
		{ "id": "SECRET", "name": "SECRET"},
		{ "id": "TOP_SECRET", "name": "TOP_SECRET"},
	];
	priorityTypes = [
		{ "id": "NORMAL", "name": "NORMAL"},
		{ "id": "MEDIUM", "name": "MEDIUM"},
		{ "id": "URGENT", "name": "URGENT"},
	];

	constructor(private http: HttpClient, public translate: TranslateService) { }

	public getModuleUsersList(): Observable<any> {
        if (!this.moduleUsers) {
            return this.http.get("/api/users/permission/DOC_MANAGEMENT_MODULE").pipe(
                map((data: any) => {
                    return this.moduleUsers = data;
                })
            );
        } else {
            return of(this.moduleUsers);
        }
    }

	public getDocumentTypesList():Observable<any>
    {
		if(!this.documenttypes){
			return this.http.get("/api/doc_mng/document_types/type/document").pipe(
				map((data:any) => { return this.documenttypes=data; })
			);
		}
       	else{
           return of(this.documenttypes);
        }
    }

	public getAllDocumentTypesList():Observable<any>
    {
		if(!this.documenttypes){
			return this.http.get("/api/doc_mng/document_types/").pipe(
				map((data:any) => { return this.documenttypes=data; })
			);
		}
       	else{
           return of(this.documenttypes);
        }
    }

	public getDocumentExecutionTypesList():Observable<any>
    {
		if(!this.documentExecutionTypes){
			return this.http.get("/api/doc_mng/document_types/type/execution").pipe(
				map((data:any) => { return this.documentExecutionTypes=data; })
			);
		}
       	else{
           return of(this.documentExecutionTypes);
        }
    }

	public getMyFinalizedDocumentList() {
		if(!this.myFinalizedDocuments){
			return this.http.get("/api/doc_mng/documents/my/finalized").pipe(
				map((data:any) => { return this.myFinalizedDocuments=data; })
			);
		}
       	else{
           return of(this.myFinalizedDocuments);
        }
	}

	public getDocumentSecurityLevels() {
		let translatedData = []
		this.securityLevels.forEach((ele) => {
			translatedData.push({ "id": ele.id, "name": this.translate.instant(ele.name)})
		});
		return of(translatedData);
	}

	public getDocumentPriorityTypes() {
		let translatedData = []
		this.priorityTypes.forEach((ele) => {
			translatedData.push({ "id": ele.id, "name": this.translate.instant(ele.name)})
		});
		return of(translatedData);
	}

  getDashboardCount(): Observable<any> {
    return this.http.get(`/api/doc_mng/dashboard/count`);
   }

   getMyDashboardCount(): Observable<any> {
    return this.http.get(`/api/doc_mng/dashboard/mydashboard/count`);
   }

   getDocumentCountByEntity(): Observable<any> {
	return this.http.get(`/api/doc_mng/dashboard/entity`);
   } 

   getMyDashboardDocumentCountbyEntity(): Observable<any> {
	return this.http.get(`/api/doc_mng/dashboard/mydashboard/entity`);
   } 

	getDocTypeRecordList(data, filters) {
		return this.http.post(`/api/doc_mng/document_types/list`, {
		  input: data,
		  filters: filters
		});
	}

	addDocType(value: any): Observable<Object> {
		return this.http.post(`/api/doc_mng/document_types`, value);
	}

	getDocTyeById(id: number): Observable<Object> {
		return this.http.get(`/api/doc_mng/document_types/${id}`);
	}

	updateDocumentTypeById(id: number, value: any): Observable<Object> {
		return this.http.put(`/api/doc_mng/document_types/${id}`, value);
	}

	getDocumentCountByTypeId(pId): Observable<any> {
		return this.http.get(`/api/doc_mng/dashboard/count/typeId`, {
			params: { pId }
		});
	}

	getMyDashboardDocumentCountByTypeId(pId): Observable<any> {
		return this.http.get(`/api/doc_mng/dashboard/mydashboard/count/typeId`, {
			params: { pId }
		});
	}

	getDocumentCountbyEntityByTypeId(pId): Observable<any> {
		return this.http.get(`/api/doc_mng/dashboard/count/type/typeId`, {
			params: { pId }
		});
	}

	getMyDashboardDocumentCountbyEntityByTypeId(pId): Observable<any> {
		return this.http.get(`/api/doc_mng/dashboard/mydashboard/count/type/typeId`, {
			params: { pId }
		});
	}

	public getDocumentNoteTypesList():Observable<any>
    {
		if(!this.documentNoteTypes){
			return this.http.get("/api/doc_mng/document_note_types").pipe(
				map((data:any) => { return this.documentNoteTypes=data; })
			);
		}
       	else{
           return of(this.documentNoteTypes);
        }
    }

}
