import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ChangeLanguageService } from "./../../services/change-language.service";


@Component({
  selector: 'app-select-lang-page',
  templateUrl: './select-lang-page.component.html',
  styleUrls: ['./select-lang-page.component.scss']
})

export class SelectLangPageComponent implements OnInit {
	lang = 'ps';
	languages = [];

	constructor(
			private router: Router, private authService: AuthService,
			private spinner: NgxSpinnerService,
			public translate: TranslateService,
			private route: ActivatedRoute,
			private changeLanguageService: ChangeLanguageService
			) { }
	
	ngOnInit(): void {
		this.languages = this.changeLanguageService.languages;

		let localLang = localStorage.getItem('lang');
		if(localLang != null && localLang.match(/en|ps|dr/)) {
			this.authService.routeToServiceSeletionPage();
		}
	}

	changeLanguage(Language: any) {
		// this.changeLanguageService.ChangeLanguage(Language);
		localStorage.setItem('lang', Language.abbr);
		this.authService.routeToServiceSeletionPage();
	}

}
