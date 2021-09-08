import { ChangeDetectorRef, Component, Input, OnInit,EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { QuillEditorComponent } from 'ngx-quill';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from '../../document.service';
import { DocMngService } from '../../../doc-mng.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchDocumentComponent } from '../../search-document/search-document.component';
import { ProvinceService } from 'app/services/province.service';

@Component({
    selector: 'app-add-note-hukm-document',
    templateUrl: './add-note-hukm.component.html',
    styleUrls: ['./add-note-hukm.component.scss']
})

export class AddNoteHukmComponent implements OnInit {

    editorConfig = {
		height: 500,
		menubar: true,
		plugins: [
			'print preview advlist autolink lists link image charmap print preview anchor',
			'searchreplace visualblocks code fullscreen',
			'insertdatetime media table paste code directionality help wordcount'
		],
		toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | ltr rtl | bullist numlist outdent indent | image removeformat | help',
		automatic_uploads: true,
		file_picker_types: 'image',
        directionality :"rtl"
	};

    @Output() addNoteHukmEvent: EventEmitter<any> = new EventEmitter();
	@Input() docId;
	@Input() id;
	editForm: FormGroup;
	data;
    showEditForm= false;
   
    constructor(private baseService: BaseService,
		private documentService: DocumentService,
		private docMngService: DocMngService,
		private translatedToastr: TranslatedToastrService,
		private formBuilder: FormBuilder,
		private ngModal: NgbModal,
		private translate: TranslateService,
		private spinner: NgxSpinnerService,
		public activeModal: NgbActiveModal,
		private router: Router,
		private dateConvert: DateConvertService,
		private authService: AuthService,
		private changeDetector: ChangeDetectorRef) { }

    ngOnInit(): void {

        this.documentService.getRecordExecutionById(this.id).subscribe((response: any) => {
                console.log('res', response);
                this.initializeForm(response);
                this.showEditForm = true;
        }, (error) => {
                console.log('Error: ', error);
                this.showEditForm = false;
        });
        
        
    }


    initializeForm(data) {
		this.editForm = this.formBuilder.group({
			huKmcontent: [data.huKmcontent, Validators.required],
			
		});
	}


    closeModal() {
		this.activeModal.close();
	}


    submit(){
        let obj = this.editForm.value;
		const data = new FormData();
		data.append("contentHukm", JSON.stringify(obj));
		console.log("submit data >>>>>", obj);
		this.spinner.show();
		this.documentService.addNotHukm(this.id, data).subscribe((res) => {
			this.spinner.hide();
			this.addNoteHukmEvent.emit(res);
			this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
			this.closeModal();
		}, (err) => {
			this.spinner.hide();
			console.log("submit execution err >>>>", err);
		});
    }


}