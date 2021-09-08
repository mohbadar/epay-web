import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { GroupService } from '../../group.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Group } from '../../group';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';

declare var $: any;
@Component({
	selector: 'group-edit-dialog',
	templateUrl: './group-edit-dialog.component.html',
	styleUrls: ['./group-edit-dialog.component.scss']
})
export class GroupEditDialogComponent implements OnInit {
	@Output() groupEditEventEmitter = new EventEmitter<Object>();
	@Input() data;
	isLoading = false;
	newRecord: Group;
	groupEditForm: FormGroup;
	rolesController;

	formControl = new FormControl('', [
		Validators.required
	]);

	constructor(
		public groupService: GroupService, 
		private formBuilder: FormBuilder, 
		private translate: TranslateService,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService
		) {	}

	ngOnInit() {
		this.groupEditForm = this.formBuilder.group({
			name: [this.data.group.name, [Validators.required]],
			description: [this.data.group.description, [Validators.required]],
			roles: [this.data.roles.map(item => item.id)],
			active: [this.data.group.active.toString()]
		});
	}

	onFormSubmit() {
		if (this.groupEditForm.valid) {
			this.spinner.show();
			const { id } = this.data.group;
			const { name, description, active, roles } = this.groupEditForm.value;
			// Extract selected roles
			const selectedRoles = this.data.allRoles.filter(item => roles.includes(item.id));

			this.groupService.updateGroup(id, { name , description, active, roles: selectedRoles}).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.groupEditEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
			})
		}
			
		if (this.groupEditForm.invalid) {
			// To display errors below forms
			Object.keys(this.groupEditForm.controls).forEach(field => {
				const control = this.groupEditForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}

	closeModal() {
		this.activeModal.close();
	}

}
