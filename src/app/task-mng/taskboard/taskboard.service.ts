import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/template/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskboardService {
	private baseUrl = '/api/task_mng/taskboards';
	constructor(private http: HttpClient, public authService: AuthService) { }

	getTasks(taskboardId) {
		return this.http.get(`${this.baseUrl}/${taskboardId}/tasks`);
	}

	getArchivedTasksList(data, filters, taskboardId) {
		return this.http.post(`${this.baseUrl}/${taskboardId}/archived_tasks`, {
			input: data,
			filters: filters
		});
	}

	getMyTaskboards() {
		return this.http.get(`${this.baseUrl}/list`);
	}

	getAccessableTaskboards() {
		return this.http.get(`${this.baseUrl}/accessable`);
	}

	addRecord(data) {
		return this.http.post(`${this.baseUrl}`, data);
	}

	editRecord(id, data) {
		return this.http.put(`${this.baseUrl}/${id}`, data);
	}

	getRecordById(id) {
		return this.http.get(`${this.baseUrl}/${id}`)
	}

	addTaskboardStatus(id, data) {
		return this.http.post(`${this.baseUrl}/${id}/status`, data);
	}

	addTaskboardMember(id, data) {
		return this.http.post(`${this.baseUrl}/${id}/members`, data);
	}

	removeTaskboardMember(id, memberId) {
		return this.http.delete(`${this.baseUrl}/${id}/members/${memberId}`);
	}

	getTaskboardOrphanTasks(taskboardId) {
		return this.http.get(`${this.baseUrl}/${taskboardId}/orphans`)
	}

	isOwner(taskboard, authService) {
		if(taskboard.createdBy.username === authService?.principal.username) {
			return true;
		}
		return false;
	}

	isMember(taskboardMembers: any, authService) {
		for (const member of taskboardMembers) {
			if(member.username === authService?.principal.username) {
				return true;
			}
		}
		return false;
	}

}
