import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ChangeLanguageService } from "./../../services/change-language.service";

@Component({
  selector: 'app-service-selction',
  templateUrl: './service-selction.component.html',
  styleUrls: ['./service-selction.component.scss']
})
export class ServiceSelctionComponent implements OnInit {

  lang = 'ps';

  services = [
		{
			name: 'Balance Inquiry',
			abbr: 'en',
			icon: 'us.png'
		}, {
			name: 'Fund Transfer',
			abbr: 'dr',
			icon: 'afg.png'
		}, {
			name: 'Bill Payment',
			abbr: 'ps',
			icon: 'afg.png'
		},
    {
			name: 'Fee Payment',
			abbr: 'ps',
			icon: 'afg.png'
		},
    {
			name: 'M2U',
			abbr: 'ps',
			icon: 'afg.png'
		},
    {
			name: 'Breshna Payment',
			abbr: 'ps',
			icon: 'afg.png'
		},
	]

	constructor(
			private router: Router, 
      private authService: AuthService,
			private spinner: NgxSpinnerService,
			public translate: TranslateService,
			private route: ActivatedRoute,
			private changeLanguageService: ChangeLanguageService,
			) { }
	
	ngOnInit(): void {

    this.services = this.chunks(this.services,3);

		let localLang = localStorage.getItem('lang');
    console.log("lang", localLang);
    
		if(localLang == null || !localLang.match(/en|ps|dr/)) {
      console.log("Service Selection Page")
			this.authService.routeToLangSeletionPage();
		}
	}

	selectService(service) {
    console.log("Service Selected: "+ service);

    switch(service){
      case 'FUND_TRANSFER': {
        this.router.navigateByUrl('/fund-transfer');
      }
    }
	}


  chunks(array, size) {
    let results = [];
    results = [];
    while (array.length) {
        results.push(array.splice(0, size));
    }
    return results;
};

}

