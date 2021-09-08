import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {	
	loading = false;
	
	constructor(private cdref: ChangeDetectorRef, public translate: TranslateService, 
		private router: Router) { }

	ngOnInit(): void { }
	
	addNewRecord() {
		this.router.navigate(['receptions/add'])
		this.loading = true;
	}

	editRecord() {
		this.loading = true;
	}

	deleteRecord() {
		this.loading = true;
	}
}
