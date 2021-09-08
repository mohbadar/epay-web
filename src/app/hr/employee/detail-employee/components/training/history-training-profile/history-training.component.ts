import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrainingService } from './../training.service';

@Component({
  selector: 'app-hitory-training',
  templateUrl: './history-training.component.html',
  styleUrls: ['./history-training.component.scss']
})
export class HistoryTrainingComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;

  data;
  modelType:boolean = false;
  rows = new Array();
  tempRows = [];
	columnsWithSearch = [];
	closeResult = '';
	dTableFlag = false;
	dTable;
	loading;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private spinner:NgxSpinnerService,
    private trainingService: TrainingService,
    private cdref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);
    this.trainingService.getTrainingLog(this.data).subscribe(res=>{
			for(let i = 0; i < res.length; i++){
        this.rows.push(res[i]['entity']);
			}

      console.log("all data: ", this.rows);
      this.tempRows = this.rows;
			this.dTableFlag = true;
			this.loading = false;
			this.cdref.detectChanges();
      

		}, err=>{
			console.log("err in Log Data:", err);
		});
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
