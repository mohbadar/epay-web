import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { DepartmentService } from "./../../department.service";
import { TranslatedToastrService } from "app/services/translated-toastr.service";

@Component({
    selector: "department-create-dialog",
    templateUrl: "./department-create-dialog.component.html",
    styleUrls: ["./department-create-dialog.component.scss"],
})
export class DepartmentCreateDialogComponent implements OnInit {
    editorConfig = {
        height: 200,
        menubar: false,
        plugins: [
            'code directionality'
        ],
        toolbar: 'bold | fontsizeselect  | alignleft aligncenter alignright | ltr rtl ',
        directionality :"rtl",
        content_style: "body { line-height: 1; }"
    };
    @Output() departmentCreateEventEmitter = new EventEmitter<Object>();
    @Input() data;
    createForm: FormGroup;
    departments$;

    constructor(
        private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
        private spinner: NgxSpinnerService,
        private translatedToastr: TranslatedToastrService,
        private departmentService: DepartmentService
    ) { }

    ngOnInit() {
        this.getAllDepartments();
        this.createForm = this.formBuilder.group({
            header: [null],
            footer: [null],
            nameEn: [null, [Validators.required]],
            nameDr: [null, [Validators.required]],
            namePs: [null, [Validators.required]],
            parentId: [null],
        });
    }

    getAllDepartments() {
        this.departmentService.getDepartments().subscribe(data => {
            this.departments$ = data;
        }, (err) => {
            console.log('data error: ', err);
        });
    }

    onFormSubmit() {
        if (this.createForm.valid) {
            this.spinner.show();
            this.departmentService.createRecord(this.createForm.value).subscribe((response) => {
                this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
                this.spinner.hide();
                this.activeModal.close();
                this.departmentCreateEventEmitter.emit(response);
            }, (error) => {
                this.spinner.hide();
                this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
                console.log(error);
            })
        }

        if (this.createForm.invalid) {
            // To display errors below forms
            Object.keys(this.createForm.controls).forEach(field => {
                const control = this.createForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
        }
    }

    closeModal() {
        this.activeModal.close();
    }
}
