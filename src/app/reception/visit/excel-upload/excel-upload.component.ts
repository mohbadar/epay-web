import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VisitService } from '../visit.service';
import * as fileSaver from "file-saver";

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss']
})
export class ExcelUploadComponent implements OnInit {
	@Output() jsonData: EventEmitter<any> = new EventEmitter();
	newForm: FormGroup;
	fileSource: string;
	excelFile: File = null;
	
	constructor(private router: Router, private route: ActivatedRoute,
		private spinner: NgxSpinnerService,
		private translate: TranslateService,
		private toastr: ToastrService,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private baseService: BaseService,
		private dConvert: DateConvertService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		private activeModal: NgbActiveModal,
		private visitService: VisitService) { }

	ngOnInit(): void {
		this.initializeForm();
		this.fetchEssentialData();
	}

	initializeForm() {
		this.newForm = this.fb.group({
			file: [null, [Validators.required]],
		});
	}

	fetchEssentialData() {
	}

	onFileChange(event) {
		if (event.target.files.length > 0) {
			this.excelFile = event.target.files[0];
			this.newForm.patchValue({
				file: this.excelFile
			});
		}
	}

	excelTemplate() {
		console.log("download template");
		this.visitService.getExcelTemplate().subscribe((data) => {
			const fileName = data.headers.get('filename');
			this.saveFile(data.body, fileName);
		}, (err) => {
			console.log('error: ', err);
		});
	}

	closeModal() {
        this.activeModal.close();
    }

	submitForm() {
		if (this.newForm.invalid) {
			this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
            document.getElementById('excelUploadForm').classList.add('input-error');
        } else {
            this.submit();
        }
	}

	submit() {
        // let obj = this.newForm.value;
		const formData = new FormData();
		formData.append('file', this.excelFile);

        this.spinner.show();
        this.visitService.uploadExcel(formData).subscribe(res => {
			console.log(res);
			this.jsonData.emit(res);
            this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_UPLOADED_SUCCESSFULLY");
			this.closeModal();
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
    }

	saveFile(data: any, fileName?: string) {
		const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
		const file = new File([blob], fileName != null ? fileName : 'template.xlsx',
			{ type: 'application/vnd.ms-excel' });
		fileSaver.saveAs(file, fileName);
	}
}
