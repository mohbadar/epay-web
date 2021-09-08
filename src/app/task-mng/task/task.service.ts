import { HttpClient, HttpRequest } from '@angular/common/http';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
	private baseUrl = '/api/task_mng/tasks';
	constructor(private http: HttpClient, private fileDownloadService: FileDownloadService) { }
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
		return this.http.put(`${this.baseUrl}/${id}`, data);
	}

	getRecordById(id) {
		return this.http.get(`${this.baseUrl}/${id}`)
	}

	deleteRecord(id) {
		return this.http.delete(`${this.baseUrl}/${id}`);
	}

	archiveRecord(id) {
		return this.http.put(`${this.baseUrl}/${id}/archive`, {});
	}

	updateTaskStatus(taskId, data) {
		return this.http.put(`${this.baseUrl}/${taskId}/status`, data);
	}

	getTaskComments(id) {
		return this.http.get(`${this.baseUrl}/${id}/comments`);
	}

	addTaskComment(id, data) {
		return this.http.post(`${this.baseUrl}/${id}/comments`, data);
	}

	editTaskComment(id, data) {
		return this.http.post(`${this.baseUrl}/${id}/comments`, data);
	}

	addTaskExecution(id, data) {
		return this.http.post(`${this.baseUrl}/${id}/executions`, data);
	}

	addTaskAssignee(id, data) {
		return this.http.post(`${this.baseUrl}/${id}/assignees`, data);
	}

	removeTaskAssignee(id, assigneeId) {
		return this.http.delete(`${this.baseUrl}/${id}/assignees/${assigneeId}`);
	}

	addTaskSubTask(taskId, subTaskId) {
		return this.http.post(`${this.baseUrl}/${taskId}/subtask/${subTaskId}`, null);
	}

	getTaskAttachments(taskId) {
		return this.http.get(`${this.baseUrl}/${taskId}/attachments`)
	}

	uploadTaskAttachment(id, file) {
		const req = new HttpRequest('POST', `${this.baseUrl}/${id}/attachments`, file, {
		  reportProgress: true,
		  responseType: 'blob',
		});

		return this.http.request(req);
	}

	downloadAttachment(taskAttchmentId) {
		return this.fileDownloadService.download(`${this.baseUrl}/downloadFile/attachments/${taskAttchmentId}`);
	}

	downloadExecutionAttachment(executionAttchmentId) {
		return this.fileDownloadService.download(`${this.baseUrl}/downloadFile/executions/${executionAttchmentId}`);
	}

	isOwner(task, authService) {
		if(task.createdBy.username === authService?.principal.username) {
			return true;
		}
		return false;
	}

	isMember(taskMembers, authService) {
		for (const member of taskMembers) {
			if(member.username === authService?.principal.username) {
				return true;
			}
		}
		return false;
	}

  addTaskDueDate(id, data){
    console.log("Due date is: ", data);
    return this.http.post(`${this.baseUrl}/${id}/due-date`, data);
  }

  addTaskCompletionDate(id, data){
    return this.http.post(`${this.baseUrl}/${id}/completion-date`, data);
  }

}
