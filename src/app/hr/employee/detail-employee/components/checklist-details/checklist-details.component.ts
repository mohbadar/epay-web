import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-checklist-profile',
  templateUrl: './checklist-details.component.html',
  styleUrls: ['./checklist-details.component.scss']
})
export class ChecklistDetailsComponent implements OnInit {

  data;
  modelType:boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("checklist :", this.data);

    

  }

  


  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'EDUCATION'};
    }
    
    this.activeModal.close(data);
  }





}
