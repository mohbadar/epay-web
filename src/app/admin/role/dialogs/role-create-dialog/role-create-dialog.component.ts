import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { RoleService } from '../../role.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Role } from '../../role';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';

// declare var $: any;

@Component({
	selector: 'role-create-dialog',
	templateUrl: './role-create-dialog.component.html',
	styleUrls: ['./role-create-dialog.component.scss']
})

export class RoleCreateDialogComponent implements OnInit {
	@Output() roleCreateEventEmitter = new EventEmitter<Object>();
	@Input() data;
	roleCreateForm: FormGroup;

	constructor(
			private roleService: RoleService, 
			private formBuilder: FormBuilder, 
			private translate: TranslateService,
			private activeModal: NgbActiveModal,
			private spinner: NgxSpinnerService,
			private translatedToastr: TranslatedToastrService,
			) { }

	ngOnInit() {
		this.roleCreateForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			description: ['', [Validators.required]],
			permissions: [''],
			active: ['']
		});
	 }

	onFormSubmit() {
		if (this.roleCreateForm.valid) {
			this.spinner.show();
			const { name, description, permissions, active } = this.roleCreateForm.value;
			// extract selected permissions
			const selectedPermissions = this.data.filter((item => permissions.includes(item.id)));
			console.log('Selected permissions', selectedPermissions);
			this.roleService.createRole({name, description, permissions: selectedPermissions, active}).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        		this.spinner.hide();
        		this.activeModal.close();
				this.roleCreateEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        		console.log(error);
			});
		}
	  
		if (this.roleCreateForm.invalid) {
		// To display errors below forms
		Object.keys(this.roleCreateForm.controls).forEach(field => {
			const control = this.roleCreateForm.get(field);
			control.markAsTouched({ onlySelf: true });
		});
		}
	}

	closeModal() {
		this.activeModal.close();
	}

}
