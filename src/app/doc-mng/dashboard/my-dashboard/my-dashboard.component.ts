import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {DocMngService} from 'app/doc-mng/doc-mng.service';
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
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit {
  outgoing;
  incoming;
  processed;
  unprocessed;
  underprocess;

  constructor(
    public translate: TranslateService,
    private docService: DocMngService,
    private spinner: NgxSpinnerService,
    private cdref: ChangeDetectorRef,
  ) { }
  ngOnInit(): void {
   this.TotalCount();
  }

  TotalCount(){
		this.spinner.show();
		this.docService.getMyDashboardCount().subscribe(res=>{
			console.log("dashboard data: ", res);
			this.outgoing = res['outgoing'];
			this.incoming = res['incoming']
			this.processed = res['processed'];
			this.unprocessed = res['unprocessed'];
			this.underprocess = res['underprocess'];
			this.spinner.hide();
      this.cdref.detectChanges();
		}, err=>{
			console.log("errror in count");
			this.spinner.hide();
		});
	}

 

  










}
