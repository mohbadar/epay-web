import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

 
@Injectable({
	providedIn: 'root'
})
export class ChangeLanguageService {
	selectedLanguageText: 'پښتو';
	selectedLanguageFlag = "./assets/img/flags/afg.png";
	selectedLanguageAbbr = 'ps'
	
	languages = [
		{
			name: 'English',
			abbr: 'en',
			icon: 'us.png'
		}, {
			name: 'دری',
			abbr: 'dr',
			icon: 'afg.png'
		}, {
			name: 'پښتو',
			abbr: 'ps',
			icon: 'afg.png'
		},
	]

	constructor(
		public translate: TranslateService,
		private router: Router
	) {	}

	getLanguageObj(lang) {
		for (const language of this.languages) {
			if(language.abbr == lang) {
				return language;
			}
		}
		return null;
	}

	ChangeLanguage(lang) {
		let language = lang.abbr;
		this.selectedLanguageText = lang.name;
		this.selectedLanguageAbbr = language;
		localStorage.setItem('lang', lang.abbr);
		console.log("LocalStorage", localStorage.getItem('lang'));

		if(!language.match(/en|ps|dr/)) {
			this.router.navigate(['/select-lang']);
		}

		this.translate.use(language);
		this.changeCssFile(language);

		if (language == 'en') {
			document.body.classList.remove('rtl');
			document.body.classList.add('ltr');
			document.body.dir = 'ltr';
		} else {
			document.body.classList.remove('ltr');
			document.body.classList.add('rtl');
			document.body.dir = 'rtl';
		}

		if (language === 'en') {
			this.selectedLanguageFlag = "./assets/img/flags/us.png";
		}
		else if (language === 'dr') {
			this.selectedLanguageFlag = "./assets/img/flags/afg.png";
		}
		else if (language === 'ps') {
			this.selectedLanguageFlag = "./assets/img/flags/afg.png";
		}
	}

	changeCssFile(lang: string) {
		let headTag = document.getElementsByTagName("head")[0] as HTMLHeadElement;
		let existingLink = document.getElementById("langCss") as HTMLLinkElement;
		let bundleName = 'rtlStyle.css';
		// if (existingLink) {
		// 	let bundleVal = existingLink.href.split("/");
		// 	if ((lang === "en" && bundleVal[bundleVal.length - 1] != "ltrStyle.css") || (lang !== "en" && bundleVal[bundleVal.length - 1] != "rtlStyle.css")) {
		// 		existingLink.href = bundleName;
		// 	}
		// } else {
		// 	console.log('calling the SCSS:');

		// 	let newLink = document.createElement("link");
		// 	newLink.rel = "stylesheet";
		// 	newLink.type = "text/css";
		// 	newLink.id = "langCss";
		// 	newLink.href = bundleName;
		// 	headTag.appendChild(newLink);
		// }
		if(!existingLink) {
			let newLink = document.createElement("link");
				newLink.rel = "stylesheet";
				newLink.type = "text/css";
				newLink.id = "langCss";
				newLink.href = bundleName;
				headTag.appendChild(newLink);
		}
	}

}