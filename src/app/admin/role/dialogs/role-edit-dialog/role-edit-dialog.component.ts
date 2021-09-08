import { Component,  OnInit, Output, Input, EventEmitter } from '@angular/core';
import { RoleService } from '../../role.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Role } from '../../role';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';

@Component({
    selector: 'role-edit-dialog',
    templateUrl: './role-edit-dialog.component.html',
    styleUrls: ['./role-edit-dialog.component.scss']
})
export class RoleEditDialogComponent implements OnInit {
    @Output() roleEditEventEmitter = new EventEmitter<Object>();
    isLoading = false;
    newRole: Role;
    roleEditForm: FormGroup;
    @Input() data;

    constructor(
        public roleService: RoleService,
        private formBuilder: FormBuilder,
        private activeModal: NgbActiveModal,
        private spinner: NgxSpinnerService,
        private translatedToastr: TranslatedToastrService
    ) {}

    ngOnInit() {
        console.log('Dialog: ', this.data);
        this.roleEditForm = this.formBuilder.group({
            name: [this.data.role.name, [Validators.required]],
            description: [this.data.role.description, [Validators.required]],
            permissions: [this.data.permissions.map(item => item.id)],
            active: [this.data.role.active.toString()]
        });
    }

    onFormSubmit() {
        if (this.roleEditForm.valid) {
            this.spinner.show();
            const { id } = this.data.role;
            const { name, description, active, permissions } = this.roleEditForm.value;
            // extract selected permissions
            const selectedPermissions = this.data.allPermissions.filter((item => permissions.includes(item.id)));
            this.roleService.updateRole(id, { name, description, active, permissions: selectedPermissions}).subscribe((response) => {
                this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
			    this.spinner.hide();
			    this.activeModal.close();
			    this.roleEditEventEmitter.emit(response);
			}, (error) => {
                this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
                console.log(error);
            });
        }

        if (this.roleEditForm.invalid) {
            // To display errors below forms
			Object.keys(this.roleEditForm.controls).forEach(field => {
				const control = this.roleEditForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
        }
    }

    closeModal() {
        this.activeModal.close();
      }
}
