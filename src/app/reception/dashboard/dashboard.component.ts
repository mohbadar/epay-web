import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {ReceptionService} from 'app/reception/reception.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
	ApexAxisChartSeries,
	ApexChart,
	ApexXAxis,
	ApexYAxis,
	ApexGrid,
	ApexDataLabels,
	ApexStroke,
	ApexTitleSubtitle,
	ApexTooltip,
	ApexLegend,
	ApexPlotOptions,
	ApexFill,
	ApexMarkers,
	ApexTheme,
	ApexNonAxisChartSeries,
	ApexResponsive
  } from "ng-apexcharts";

  export type ChartOptions = {
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    colors: string[],
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis | ApexYAxis[],
    title: ApexTitleSubtitle;
    dataLabels: ApexDataLabels,
    stroke: ApexStroke,
    grid: ApexGrid,
    legend?: ApexLegend,
    tooltip?: ApexTooltip,
    plotOptions?: ApexPlotOptions,
    labels?: string[],
    fill: ApexFill,
    markers?: ApexMarkers,
    theme: ApexTheme,
    responsive: ApexResponsive[]
    };
    
    var $primary = "#975AFF",
    $success = "#40C057",
    $info = "#2F8BE6",
    $warning = "#F77E17",
    $danger = "#F55252",
    $label_color_light = "#E6EAEE",
    $red = "#A10A28",
    $blue_red = "#C7B42C",
    $orange = "#AAAAAA",
    $orange_blue = "#5AA454",
    $1new = "#f5d442",
    $2new = "#b88365",
    $3new = "#65b7b8",
    $4new = "#ebb5e9",
    $5new = "#f74a98",
    $6new = "#178252",
    $7new = "#c96969",
    $8new = "#30700b";
  var themeColors = [$primary, $success,$warning, $danger, $info,$label_color_light, 
    $red,$blue_red,$orange,$orange_blue, $1new, $2new, $3new, $4new, $5new, $6new, $7new, $8new];

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
	view: [700, 400],
	
};
@Component({
  selector: 'app-recept-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
		xAxisLabel: 'PROVINCES',
		showYAxisLabel: true,
		yAxisLabel: 'COUNT',
		view: [700, 400],
	};

  donutChartOptions : Partial<ChartOptions>;
  public genderData = new Array();
  public genderLabels = new Array();

  visitDataByDepartment = null;
  allVisits;
  todayVisits;
  allVisitors;
  todayVisitors;
  loadingGender = false;

  constructor(
    public translate: TranslateService,
    private recepService: ReceptionService,
    private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.TotalCount();
    this.LoadVisitCountByDepartment();

  }

  TotalCount(){
		this.spinner.show();
		this.recepService.getDashboardCount().subscribe(res=>{
			console.log("all data: ", res);
			this.allVisits = res["allvisit"];
			this.todayVisits = res["todayvisit"];
			this.allVisitors = res["allvisitor"];
			this.todayVisitors = res["todayvisitor"];
			this.spinner.hide();
      this.cdref.detectChanges();
		}, err=>{
			console.log("errror in count");
			this.spinner.hide();
		});
	}

  LoadVisitCountByDepartment(){
    this.spinner.show();
		this.recepService.getVisitCountByDepartment().subscribe(data=>{
			console.log("all department count: ", data);
      this.vertical_chart_opt.xAxisLabel = this.translate.instant('DEPARTMENT');
			this.vertical_chart_opt.yAxisLabel = this.translate.instant('COUNT');
			this.vertical_chart_opt.legendTitle = this.translate.instant('Legend');
			this.visitDataByDepartment = Object.assign({}, vertical_chart_opt, {data: []});
			console.log('data', this.visitDataByDepartment, this.vertical_chart_opt);
			
			data.forEach(row => {
				this.visitDataByDepartment.data.push({
					'name': row[0],
					'value': row[1]
				});
			});
			this.spinner.hide();
      this.cdref.detectChanges();
		}, err=>{
			console.log("errror in count");
			this.spinner.hide();
		});
  }


  loadTypeData(){
    this.genderData = [];
		this.genderLabels = [];
		this.spinner.show();
		this.recepService.getVisitCountByType().subscribe(res=>{
			console.log("all Gender data:", res);
			for(let i=0; i<res.length; i++){		
					this.genderData.push(res[i][1]);
					this.genderLabels.push(this.translate.instant(res[i][0]));		
			}
			this.loadChartData(this.genderLabels, this.genderData);
			this.spinner.hide();
			this.loadingGender = true;
		}, err=>{
			console.log("error in allthenic data");
			this.genderData = [];
			this.genderLabels = [];
			this.spinner.hide();
		});
  }


  loadChartData(genderLabels, genderDatas){
		this.donutChartOptions = {
			chart: {
			  type: 'donut',
			  height: 320
			},
			colors: themeColors,
			labels:genderLabels,
			series:genderDatas,
			legend: {
			  itemMargin: {
				horizontal: 2
			  },
			},
			responsive: [{
			  breakpoint: 576,
			  options: {
				chart: {
				  width: 300
				},
				legend: {
				  position: 'bottom'
				}
			  }
			}]
		  }

		  this.cdref.detectChanges();
	  }

}
