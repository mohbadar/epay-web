import { JobService } from './../../../../services/job.service';
import { Component, OnInit, Inject, Input, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { UserService } from "../../user.service";
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder, AbstractControl, ValidatorFn } from "@angular/forms";
import { User } from "./../../user";
import { TranslateService } from "@ngx-translate/core";
import { Globals } from "app/_helpers/globals";
import { AuthService } from "app/template/shared/auth/auth.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { GroupService } from "app/admin/group/group.service";
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { DepartmentService } from "app/configuration/department/department.service";

@Component({
    selector: "user-create-dialog",
    templateUrl: "./user-create-dialog.component.html",
    styleUrls: ["./user-create-dialog.component.scss"],
})
export class UserCreateDialogComponent implements OnInit {
    @Output() userCreateEventEmitter = new EventEmitter<Object>();
    @Input() data;
    @Input() groupData;

    ministries$;
    departments$;
    jobs$;
    userCreateForm: FormGroup;
    passwordMatch = true;

    constructor(
        public userService: UserService,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private departmentService: DepartmentService,
        private jobService: JobService,
        public globals: Globals,
        public activeModal: NgbActiveModal,
        private spinner: NgxSpinnerService,
        private translatedToastr: TranslatedToastrService
    ) { }

    ngOnInit() {
        console.log("USER : ", this.data);
        console.log("Groups: ", this.groupData);
        this.getMinistries();
        this.getJobs();

        this.userCreateForm = this.formBuilder.group(
            {
                name: [null, [Validators.required]],
                username: [null, [Validators.required, Validators.minLength(3)]],
                groups: [null],
                entityId: [null],
                departmentId: [null],
                accessibleDepartments: [null],
                jobId: [null, [Validators.required]],
                phone_no: [null, [Validators.required]],
                address: [null, [Validators.required]],
                email: [null, [Validators.required, Validators.email]],
                password: [null, [Validators.required, Validators.minLength(3)]],
                confirm_password: [null, Validators.required],
                active: false,
                reviewerRequired: true,
            },
            { validator: this.checkPasswords }
        );
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

    getDepartments() {
        this.departments$ = this.ministries$;
    }

    // compare password with confirm password.
    checkPasswords(form: AbstractControl): { invalid: boolean } {
        if (form.get("password").value !== form.get("confirm_password").value) {
            return { invalid: true };
        }
    }

    onFormSubmit() {
        if (this.userCreateForm.valid) {
            this.spinner.show();
            console.log(this.userCreateForm.value);
            const { name, username, environments, groups, entityId, departmentId, jobId, phone_no, address, email, password, confirm_password, active, is_client, accessibleDepartments, reviewerRequired } = this.userCreateForm.value;
            this.userService.createUser({ name, username, environments, groups, entityId, departmentId, jobId, phone_no, address, email, password, confirm_password, active, is_client, accessibleDepartments, reviewerRequired }).subscribe((response) => {
                if (response) {
                    this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
                    console.log(response);
                    this.spinner.hide();
                    this.activeModal.close();
                    this.userCreateEventEmitter.emit(response);
                } else {
                    this.spinner.hide();
                    this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
                    console.log(response);
                }
            }, (error) => {
                this.spinner.hide();
                this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
                console.log(error);
            });
        }
        if (this.userCreateForm.invalid) {
            // To display errors below forms
            Object.keys(this.userCreateForm.controls).forEach(field => {
                const control = this.userCreateForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
        }
    }

    closeModal() {
        this.activeModal.close();
    }
}
