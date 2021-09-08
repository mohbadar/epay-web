import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileDownloadService } from 'app/services/file-download.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
	private baseUrl = '/api/hr/employees';
	constructor(
		private http: HttpClient,
		private fileDownloadService: FileDownloadService
	  ) { }

	getRecordList(data, filters) {
		return this.http.post(`${this.baseUrl}/list`, {
			input: data,
			filters: filters
		});
	}

	addRecord(data) {
	return this.http.post(`${this.baseUrl}/create`, data);
	}

	editRecord(id: number, data) {
	return this.http.put(`${this.baseUrl}/${id}`, data);
	}

	getRecordById(id) {
	return this.http.get(`${this.baseUrl}/${id}`)
	}

	getLastestEducationByProfile(id){
	return this.http.get(`${this.baseUrl}/lasteducation/${id}`);
	}

	approveProfileById(id){
	return this.http.get(`${this.baseUrl}/approve/${id}`);
	}

	getRecordByIdEdit(id) {
	return this.http.get(`${this.baseUrl}/edit/${id}`)
	}

	getEthnicities() {
	return this.http.get(`/api/ethnicities`);
	}

	getNationalities() {
	return this.http.get(`/api/nationalities`);
	}

	getReligions() {
	return this.http.get(`/api/religions`);
	}

	getSects() {
	return this.http.get(`/api/sects`);
	}

	getLanguages() {
	return this.http.get(`/api/languages`);
	}

	getEmployeeGrade() {
	return this.http.get(`/api/employeegrades`);
	}

	getEmployeeMilitaryGrade(){
	return this.http.get(`/api/employeemilitarygrades`);
	}

	getEmployeeStatus() {
	return this.http.get(`/api/employeestatus`);
	}

	getEmployeePosition() {
	return this.http.get(`/api/employeepositions`);
	}

	getGender() {
	return this.http.get(`/api/genders`);
	}

	getProfileChecklist(pId): Observable<any> {
	return this.http.get(`/api/profilechecklist/profile`, {
	params: { pId }
	});
	}
	searchCandidate(data){
	console.log('data is:', data);

	return this.http.post(`${this.baseUrl}/search`, {input:data});
	}


	addProfileSetting(id:number, data) {
	return this.http.put(`/api/profilesettings/${id}`, data);
	}

	getJobsByProfile(pId): Observable<any> {
		return this.http.get(`/api/initialprofilejob/profile`, {
			params: { pId }
		});
	}

	addBreakProfileJob(data) {
	return this.http.post(`/api/initialprofilejob/break/create`, data);
	}

	editBreakProfileJob(id: number, data) {
	return this.http.put(`/api/initialprofilejob/break/${id}`, data);
	}

	deleteBreakProfileJob(id: number): Observable<any> {
		return this.http.delete(`/api/initialprofilejob/${id}`, { responseType: 'text' });
	}

	getProfileJobById(id) {
	return this.http.get(`/api/initialprofilejob/${id}`);
	}

	getWordExperienceByProfile(id) {
	return this.http.get(`/api/initialprofilejob/work/${id}`);
	}


	getJobsByProfileendDateNull(pId): Observable<any> {
		return this.http.get(`/api/initialprofilejob/profilejob`, {
			params: { pId }
		});
	}

	getProfileJobLog(id: number): Observable<any> {
		return this.http.get(`/api/initialprofilejob/${id}/history`);
	}

	printCVProfile(id){
	console.log("printing profile CV");
	return this.fileDownloadService.downloadFile(`${this.baseUrl}/summary/print/${id}`);
	}

	printAbstractProfile(id){
	console.log("printing profile abstract");
	return this.fileDownloadService.downloadFile(`${this.baseUrl}/abstract/print/${id}`);
	}

	getNationalLanguages() {
	return this.http.get(`/api/nationallanguages`);
	}


	delete(id: number): Observable<any> {
	return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}

	getProfileLog(id: number): Observable<any> {
	return this.http.get(`${this.baseUrl}/${id}/history`);
	}
}
