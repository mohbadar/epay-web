import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from './../../department.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';


@Component({
    selector: 'department-edit-dialog',
    templateUrl: './department-edit-dialog.component.html',
    styleUrls: ['./department-edit-dialog.component.scss']
})
export class DepartmentEditDialogComponent implements OnInit {
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
    @Output() departmentEditEventEmitter = new EventEmitter<Object>();
    @Input() data;
    isLoading = false;
    editForm;

    formControl = new FormControl('', [
        Validators.required
    ]);

    constructor(
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private activeModal: NgbActiveModal,
        private spinner: NgxSpinnerService,
        private translatedToastr: TranslatedToastrService,
        private departmentService: DepartmentService
    ) {
    }

    ngOnInit() {
        this.editForm = this.formBuilder.group({
            header: [this.data.header],
            footer: [this.data.footer],
            nameEn: [this.data.nameEn, [Validators.required]],
            nameDr: [this.data.nameDr, [Validators.required]],
            namePs: [this.data.namePs, [Validators.required]]
        });
    }

    onFormSubmit() {
        if (this.editForm.valid) {
            this.spinner.show();
            const { id } = this.data;
            const { nameEn, nameDr, namePs, header, footer } = this.editForm.value;

            this.departmentService.updateRecordById(id, { nameEn, nameDr, namePs, header, footer}).subscribe((response) => {
                this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
                this.spinner.hide();
                this.activeModal.close();
                this.departmentEditEventEmitter.emit(response);
            }, (error) => {
                this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
                console.log(error);
                this.spinner.hide();
            })
        }

        if (this.editForm.invalid) {
            // To display errors below forms
            Object.keys(this.editForm.controls).forEach(field => {
                const control = this.editForm.get(field);
                control.markAsTouched({ onlySelf: true });
            });
        }
    }

    closeModal() {
        this.activeModal.close();
    }

}
