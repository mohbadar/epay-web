import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ChangeLanguageService } from "./../../services/change-language.service";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
	loginFormSubmitted = false;
	isLoginFailed = false;
	lang = 'ps';
	languages;
	selectedLanguageAbbr;
	selectedLanguageText;
	selectedLanguageFlag;
	

	loginForm = new FormGroup({
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
		rememberMe: new FormControl(true),
		lang: new FormControl('', [Validators.required])
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
		} else {
			this.loginForm.controls.lang.setValue(localLang);
			this.changeLanguage(this.changeLanguageService.getLanguageObj(localLang));
		}
	}

	alterLanguage() {
		this.changeLanguage(this.changeLanguageService.getLanguageObj(this.loginForm.controls.lang.value));
	}

	get lf() {
		return this.loginForm.controls;
	}

	// On submit button click
	onSubmit() {
		this.loginFormSubmitted = true;
		if (this.loginForm.invalid) {
			return;
		}


		this.spinner.show();

		this.authService.signinUser(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.lang)
			.subscribe((res) => {
				console.log("Successful Login");
				const token = res.token;
				this.loginForm.reset({});
				this.authService.saveToken(token);
				this.authService.routeToCustomPage("/");
				this.spinner.hide();
			}, (err) => {
				this.isLoginFailed = true;
				this.spinner.hide();
				console.log('error: ' + err)
		});
	}

	changeLanguage(Language: any) {
		this.changeLanguageService.ChangeLanguage(Language);
		this.selectedLanguageText = this.changeLanguageService.selectedLanguageText;
		this.selectedLanguageFlag = this.changeLanguageService.selectedLanguageFlag;
		this.selectedLanguageAbbr = this.changeLanguageService.selectedLanguageAbbr;
	}

}
