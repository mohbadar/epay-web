import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {TaskMngService} from 'app/task-mng/task-mng.service';
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
  selector: 'app-dashboard',
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
  public taskData = new Array();
  public taskLabels = new Array();

  requestDataByDepartment = null;
  allTasks;
  todayTasks;
  allTaskBoards;
  todayTaskBoards;
  loadingTask  = false;
  taskDataByTaskBoard = null;

  constructor(
    public translate: TranslateService,
    private taskService: TaskMngService,
    private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.TotalCount();
    this.LoadTaskCountByTaskBoard();
  }


  TotalCount(){
		this.spinner.show();
		this.taskService.getDashboardCount().subscribe(res=>{
			console.log("all data: ", res);
      this.allTaskBoards=res["alltaskboards"];
      this.todayTaskBoards=res["todaytaskboards"];
			this.allTasks = res["alltasks"];
			this.todayTasks = res["todaytasks"];
			this.spinner.hide();
      this.cdref.detectChanges();
		}, err=>{
			console.log("errror in count");
			this.spinner.hide();
		});
	}


  LoadTaskCountByTaskBoard(){
    this.spinner.show();
		this.taskService.getTaskCountByTaskBoard().subscribe(data=>{
			console.log("all taskboard count: ", data);
      this.vertical_chart_opt.xAxisLabel = this.translate.instant('TASKBOARD');
			this.vertical_chart_opt.yAxisLabel = this.translate.instant('COUNT');
			this.vertical_chart_opt.legendTitle = this.translate.instant('Legend');
			this.taskDataByTaskBoard = Object.assign({}, vertical_chart_opt, {data: []});
			console.log('data', this.taskDataByTaskBoard, this.vertical_chart_opt);

			data.forEach(row => {
				this.taskDataByTaskBoard.data.push({
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
    this.taskData = [];
		this.taskLabels = [];
		this.spinner.show();
		this.taskService.getTaskCountByStatus().subscribe(res=>{
			console.log("all Task data:", res);
			for(let i=0; i<res.length; i++){
					this.taskData.push(res[i][1]);
					this.taskLabels.push(this.translate.instant(res[i][0]));
			}
			this.loadChartData(this.taskLabels, this.taskData);
			this.spinner.hide();
			this.loadingTask = true;
		}, err=>{
			console.log("error in allthenic data");
			this.taskData = [];
			this.taskLabels = [];
			this.spinner.hide();
		});
  }


  loadChartData(taskLabels, taskDatas){
		this.donutChartOptions = {
			chart: {
			  type: 'donut',
			  height: 320
			},
			colors: themeColors,
			labels:taskLabels,
			series:taskDatas,
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
