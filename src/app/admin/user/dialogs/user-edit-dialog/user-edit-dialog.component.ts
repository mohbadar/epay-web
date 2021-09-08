import { JobService } from './../../../../services/job.service';
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserService } from '../../user.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from './../../user';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from 'app/_helpers/globals';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DepartmentService } from 'app/configuration/department/department.service';
// declare var $: any;


@Component({
    selector: 'user-edit-dialog',
    templateUrl: './user-edit-dialog.component.html',
    styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {
    @Output() userEditEventEmitter = new EventEmitter<Object>();

    isLoading = true;
    newUser: User;
    userEditForm: FormGroup;
    @Input() data;
    isSysAdmin;
    envs;
    ministries$;
    departments$;
    jobs$;

    constructor(
        public userService: UserService,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private globals: Globals,
        public activeModal: NgbActiveModal,
        private spinner: NgxSpinnerService,
        private departmentService: DepartmentService,
        private jobService: JobService,
        private translatedToastr: TranslatedToastrService
    ) { }

    ngOnInit() {
        console.log('Dialog: ', this.data);
        console.log('users data is:', this.data);
        this.getMinistries();
        this.getJobs();

        this.userEditForm = this.formBuilder.group({
            name: [this.data.user.name, [Validators.required]],
            username: [this.data.user.username, [Validators.required, Validators.minLength(3)]],
            groups: [this.data.groups.map(item => item.id)],
            entityId: [{ value: this.data.user.entity?.id, disabled: true }],
            departmentId: [{ value: this.data.user.department?.id, disabled: true }],
            accessibleDepartments: [(this.data.user.accessibleDepartments === null ? null : this.data.user.accessibleDepartments.map(item => item.id))],
            jobId: [{ value: this.data.user.job.id, disabled: true }, [Validators.required]],
            phone_no: [this.data.user.phoneNo, [Validators.required]],
            address: [this.data.user.address, [Validators.required]],
            email: [this.data.user.email, [Validators.required, Validators.email]],
            active: [this.data.user.active.toString()],
            reviewerRequired: [this.data.user.reviewerRequired],
        });

        this.isSysAdmin = this.globals.principal.hasAuthority(['SYS_ADMIN']);
        if (this.isSysAdmin) {
            this.envs = this.globals.principal.environments;
        }
        this.isLoading = false;
    }
    onEditFormSubmit() {
        if (this.userEditForm.valid) {
            this.spinner.show();
            const { id } = this.data.user;
            const { name, username, groups, environments, entityId, departmentId, jobId, phone_no, address, email, active, is_client, accessibleDepartments, reviewerRequired } = this.userEditForm.value;
            this.userService.updateUser(id, { name, username, environments, groups, entityId, departmentId, jobId, phone_no, address, email, active, is_client, accessibleDepartments, reviewerRequired })
                .subscribe((response) => {
                    this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
                    this.spinner.hide();
                    this.activeModal.close();
                    console.log(response);
                    this.userEditEventEmitter.emit(response);
                }, (error) => {
                    this.spinner.hide();
                    this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
                    console.log(error);
                });
        }

        if (this.userEditForm.invalid) {
            // To display errors below forms
            Object.keys(this.userEditForm.controls).forEach(field => {
                const control = this.userEditForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
        }
    }

    closeModal() {
        this.activeModal.close();
    }

    getMinistries() {
        this.departmentService.getDepartments().subscribe(data => {
            console.log('Department list: ', data);
            this.ministries$ = data;
            this.departments$ = data;
        }, (err) => {
            console.log('data error: ', err);
        });
    }

    getJobs() {
        this.jobService.getJobs().subscribe(data => {
            console.log('Jobs list: ', data);
            this.jobs$ = data;
        }, (err) => {
            console.log('data error: ', err);
        });
    }

}
