import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
	todos = [];
	
	constructor(private modalService: NgbModal,
		private cdr: ChangeDetectorRef,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		private todoService: TodoService,
		public baseService: BaseService,) { }

	ngOnInit(): void {
		this.fetchEssentialData();
	}

	fetchEssentialData() {
		this.spinner.show();
        this.todoService.getMyTodos().subscribe((res:any) => {
			console.log(res);
			this.todos = res.todos;
			this.cdr.detectChanges();
            this.spinner.hide();
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	reload() {
		this.fetchEssentialData();
	}

	addNewRecord() {
		const modalRef = this.modalService.open(CreateTodoComponent);
		modalRef.componentInstance.todo.subscribe((todoObj) => {
			this.todos.push(todoObj);
		});
	}

	completed(todoId) {
		this.spinner.show();
        this.todoService.completed(todoId).subscribe((res:any) => {
			console.log(res);
			this.updateEntry(res);
            this.spinner.hide();
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	archive(todoId) {
		this.spinner.show();
        this.todoService.archive(todoId).subscribe((res:any) => {
			console.log(res);
			this.updateEntry(res);
            this.spinner.hide();
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	editRecord(todo) {
		const modalRef = this.modalService.open(EditTodoComponent);
		modalRef.componentInstance.data = todo;
		modalRef.componentInstance.todo.subscribe((todoObj) => {
			this.updateEntry(todoObj);
		});
	}
	
	updateEntry(updatedTodo) {
		this.todos.forEach((todo) => {
			if(todo.id == updatedTodo.id) {
				todo.done = updatedTodo.done;
				todo.archived = updatedTodo.archived;
				todo.subject = updatedTodo.subject;
				todo.details = updatedTodo.details;
				todo.bgColor = updatedTodo.bgColor;
			}
		});
		this.cdr.detectChanges();
	}

	eliminateEntry(todoId) {
		console.log("Eliminating : " + todoId);
		this.todos = this.todos.filter((todo) => {
			if(todo.id == todoId) {
				return false;
			}
			return true;
		});
	}

	delete(todoId) {
		this.spinner.show();
        this.todoService.deleteRecord(todoId).subscribe((res:any) => {
			console.log(res);
			this.eliminateEntry(todoId);
			this.cdr.detectChanges();
            this.spinner.hide();
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
	}
}
