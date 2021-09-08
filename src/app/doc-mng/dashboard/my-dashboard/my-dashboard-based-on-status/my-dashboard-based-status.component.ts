import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { isThisSecond } from 'date-fns';
import { NgxSpinnerService } from 'ngx-spinner';
import {DocMngService} from 'app/doc-mng/doc-mng.service';
import { DocumentService } from 'app/doc-mng/document/document.service';


let vertical_chart_opt = {
	colorScheme: {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
	},
	showXAxis: true,
	showYAxis: true,
	gradient: false,
	showLegend: true,
	showXAxisLabel: true,
	showYAxisLabel: true,
	view: [1000, 500],
	
};



@Component({
  selector: 'app-my-dashboard-based-status',
  templateUrl: './my-dashboard-based-status.component.html',
  styleUrls: ['./my-dashboard-based-status.component.scss'],
})

export class MyDashboardBasedStatusComponent {

	vertical_chart_opt = {
		colorScheme: {
			domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
		},
		showXAxis: true,
		showYAxis: true,
		gradient: false,
		showLegend: true,
		showXAxisLabel: true,
		legendTitle:'Legend',
		xAxisLabel: 'ENTITY',
		showYAxisLabel: true,
		yAxisLabel: 'COUNT',
		view: [700, 400],
	};
	

  documentByEntity = null;

  Types$;
  showStatus :boolean = false;
  
  addForm: FormGroup;
	constructor(
		public translate:TranslateService,
		private cdref: ChangeDetectorRef,
		private sprinner: NgxSpinnerService,
		private formBuilder: FormBuilder,
		private docService: DocMngService,
		private typeService: DocumentService

		 ) { }

	ngOnInit() {
		this.loadMapData();
		
	}

	loadMapData(){
		this.loadType();
		this.LoadOrderByEntity();
	}

	loadType(){
		this.Types$= this.typeService.getDocumentStatuesList();
	}


	LoadOrderByEntity(){
		this.sprinner.show();
		this.docService.getMyDashboardDocumentCountbyEntity().subscribe(data=>{
			console.log("res: ", data);
			this.DrawOrderChart(data);
			this.sprinner.hide();

		}, err=>{
			console.log("err: ", err);
			this.sprinner.hide();
		});
	}


	loadDocumentByStatus(event){
		this.sprinner.show();
		this.docService.getMyDashboardDocumentCountByTypeId(event.id).subscribe(res=>{
			console.log("order in type_select data:", res);
			this.DrawOrderChart(res);
			this.sprinner.hide();
		}, err=>{
			console.log("error in order data");
			this.sprinner.hide();
		});
		
		
	}



	DrawOrderChart(data){
		this.vertical_chart_opt.xAxisLabel = this.translate.instant('ENTITY');
			this.vertical_chart_opt.yAxisLabel = this.translate.instant('COUNT');
			this.vertical_chart_opt.legendTitle = this.translate.instant('Legend');
			this.documentByEntity = Object.assign({}, vertical_chart_opt, {data: []});
			console.log('data', this.documentByEntity, this.vertical_chart_opt);
			
			if(data != null)
			{
				data.forEach(row => {
					this.documentByEntity.data.push({
						'name': row[0],
						'value': row[1]
					});
				});
			}

		this.cdref.detectChanges();
	}





	  RadioClicked(event) {
		
		if(event.target.defaultValue === 'status')
		{
			this.documentByEntity = null;
			this.showStatus = true;
			console.log("pecentage");
		}
		
		else if(event.target.defaultValue === 'all'){
			this.documentByEntity = null;
			this.showStatus = false;
			this.LoadOrderByEntity();
			console.log("all");
			
		}
	
	  }

	  
	  

}
