import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ChangeLanguageService } from "./../../../services/change-language.service";

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.scss']
})
export class FundTransferComponent implements OnInit {


  formSubmitted = false;
	isOpFailed = false;
	lang = 'ps';
	languages;
	selectedLanguageAbbr;
	selectedLanguageText;
	selectedLanguageFlag;
	

  ePayForm = new FormGroup({
		cardno: new FormControl('', [Validators.required]),
		expirationDate: new FormControl('', [Validators.required]),
	});

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
		if(localLang == null || !localLang.match(/en|ps|dr/)) {
			this.router.navigate(['/select-lang']);
		}
  }


	get lf() {
		return this.ePayForm.controls;
	}

	// On submit button click
	onSubmit() {
		this.formSubmitted = true;
		if (this.ePayForm.invalid) {
			return;
		}

    console.log("SUBMITED", this.ePayForm.value);
    

		// this.spinner.show();

	}

}
