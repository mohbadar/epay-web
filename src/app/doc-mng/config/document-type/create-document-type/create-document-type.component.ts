import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-document-type',
  templateUrl: './create-document-type.component.html',
  styleUrls: ['./create-document-type.component.scss']
})
export class CreateDocumentTypeComponent implements OnInit {
  @Output() shuraCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  docCreateForm: FormGroup;
  constructor(
    private docMngService: DocMngService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService
  ) { }

  ngOnInit(): void {
    this.docCreateForm = this.formBuilder.group({
      nameEn: [null, [Validators.required]],
      nameDr: [null, [Validators.required]],
      namePs: [null,[Validators.required]]
    });
  }



  onFormSubmit() {
    console.log("docType Form Value", this.docCreateForm);
    if (this.docCreateForm.valid) {
      this.spinner.show();
      const { nameEn, nameDr, namePs } = this.docCreateForm.value;
      this.docMngService.addDocType({ nameEn, nameDr, namePs }).subscribe(response=>{
        if (response) {
          this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          console.log(response);
          this.shuraCreateEventEmitter.emit(response);
          this.activeModal.close();
        } else {
          this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          console.log(response);
        }
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(error);
      });
      
    }
    if (this.docCreateForm.invalid) {
      // To display errors below forms
      Object.keys(this.docCreateForm.controls).forEach(field => {
        const control = this.docCreateForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
