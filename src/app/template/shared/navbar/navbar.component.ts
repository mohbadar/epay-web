import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, Inject, Renderer2, ViewChild, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { DOCUMENT } from '@angular/common';
import { CustomizerService } from '../services/customizer.service';
import { FormControl } from '@angular/forms';
import { LISTITEMS } from '../data/template-search';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';
import { ChangeLanguageService } from 'app/services/change-language.service';

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
	currentLang = "en";
	username = "";
	selectedLanguageText = "English";
	selectedLanguageFlag = "./assets/img/flags/us.png";
	toggleClass = "ft-maximize";
	placement = "bottom-right";
	logoUrl = 'assets/img/afg-emblem.png';
	menuPosition = 'Side';
	isSmallScreen = false;
	protected innerWidth: any;
	searchOpenClass = "";
	transparentBGClass = "";
	hideSidebar: boolean = true;
	public isCollapsed = true;
	layoutSub: Subscription;
	configSub: Subscription;
	isLtr;
	lang: any;
	public language = "language";
	languages = [];

	@ViewChild('search') searchElement: ElementRef;
	@ViewChildren('searchResults') searchResults: QueryList<any>;

	@Output()
	toggleHideSidebar = new EventEmitter<Object>();

	@Output()
	seachTextEmpty = new EventEmitter<boolean>();

	listItems = [];
	control = new FormControl();

	public config: any = {};

	constructor(public translate: TranslateService,
		private layoutService: LayoutService,
		private router: Router,
		private cookieService: CookieService,
		private configService: ConfigService, 
		private cdr: ChangeDetectorRef,
		public authService: AuthService,
		private changeLanguageService: ChangeLanguageService) {

		const browserLang: string = translate.getBrowserLang();
		translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");
		this.config = this.configService.templateConf;
		this.innerWidth = window.innerWidth;

		this.layoutSub = layoutService.toggleSidebar$.subscribe(
			isShow => {
				this.hideSidebar = !isShow;
			});

	}

	ngOnInit() {
		this.username = this.authService?.principal.name;
		this.languages = this.changeLanguageService.languages;
		this.listItems = LISTITEMS;

		if (this.innerWidth < 1200) {
			this.isSmallScreen = true;
		}
		else {
			this.isSmallScreen = false;
		}

		
		if(localStorage.getItem('lang')){
			let lang = this.languages.find(i => i.abbr === localStorage.getItem('lang'));
			console.log("long in loading: ", lang);
			this.ChangeLanguage(lang);
		} else {
			this.router.navigate(['/select-lang']);
			// this.ChangeLanguage(this.languages[1]);
		}

	}

	ngAfterViewInit() {

		this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
			if (templateConf) {
				this.config = templateConf;
			}
			this.loadLayout();
			this.cdr.markForCheck();

		})

		setTimeout(() => {
			const direction = document.body.dir;
			this.isLtr = direction == 'ltr';
			console.log('Direction is : ', direction);
		}, 1000);
	}

	ngOnDestroy() {
		if (this.layoutSub) {
			this.layoutSub.unsubscribe();
		}
		if (this.configSub) {
			this.configSub.unsubscribe();
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.innerWidth = event.target.innerWidth;
		if (this.innerWidth < 1200) {
			this.isSmallScreen = true;
		}
		else {
			this.isSmallScreen = false;
		}
	}

	loadLayout() {

		if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
			this.menuPosition = this.config.layout.menuPosition;
		}

		if (this.config.layout.variant === "Light") {
			this.logoUrl = 'assets/img/afg-emblem.png';
		}
		else {
			this.logoUrl = 'assets/img/afg-emblem.png';
		}

		if (this.config.layout.variant === "Transparent") {
			this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
		}
		else {
			this.transparentBGClass = "";
		}

	}

	onSearchKey(event: any) {
		if (this.searchResults && this.searchResults.length > 0) {
			this.searchResults.first.host.nativeElement.classList.add('first-active-item');
		}

		if (event.target.value === "") {
			this.seachTextEmpty.emit(true);
		}
		else {
			this.seachTextEmpty.emit(false);
		}
	}

	removeActiveClass() {
		if (this.searchResults && this.searchResults.length > 0) {
			this.searchResults.first.host.nativeElement.classList.remove('first-active-item');
		}
	}

	onEscEvent() {
		this.control.setValue("");
		this.searchOpenClass = '';
		this.seachTextEmpty.emit(true);
	}

	onEnter() {
		if (this.searchResults && this.searchResults.length > 0) {
			let url = this.searchResults.first.url;
			if (url && url != '') {
				this.control.setValue("");
				this.searchOpenClass = '';
				this.router.navigate([url]);
				this.seachTextEmpty.emit(true);
			}
		}
	}

	redirectTo(value) {
		this.router.navigate([value]);
		this.seachTextEmpty.emit(true);
	}


	ChangeLanguage(lang) {
		this.changeLanguageService.ChangeLanguage(lang);
		this.selectedLanguageText = this.changeLanguageService.selectedLanguageText;
		this.selectedLanguageFlag = this.changeLanguageService.selectedLanguageFlag;

		// const language = lang.abbr;
		// 
		// localStorage.setItem('lang', lang.abbr);
		// console.log("LocalStorage", localStorage.getItem('lang'));

		// this.translate.use(language);
		// this.changeCssFile(language);

		// if (language == 'en') {
		// 	document.body.classList.remove('rtl');
		// 	document.body.classList.add('ltr');
		// 	document.body.dir = 'ltr';
		// } else {
		// 	document.body.classList.remove('ltr');
		// 	document.body.classList.add('rtl');
		// 	document.body.dir = 'rtl';
		// }

		// if (language === 'en') {
		// 	this.selectedLanguageFlag = "./assets/img/flags/us.png";
		// }
		// else if (language === 'dr') {
		// 	this.selectedLanguageFlag = "./assets/img/flags/afg.png";
		// }
		// else if (language === 'ps') {
		// 	this.selectedLanguageFlag = "./assets/img/flags/afg.png";
		// }
	}

	// changeCssFile(lang: string) {
	// 	let headTag = document.getElementsByTagName("head")[0] as HTMLHeadElement;
	// 	let existingLink = document.getElementById("langCss") as HTMLLinkElement;
	// 	let bundleName = 'rtlStyle.css';
	// 	// if (existingLink) {
	// 	// 	let bundleVal = existingLink.href.split("/");
	// 	// 	if ((lang === "en" && bundleVal[bundleVal.length - 1] != "ltrStyle.css") || (lang !== "en" && bundleVal[bundleVal.length - 1] != "rtlStyle.css")) {
	// 	// 		existingLink.href = bundleName;
	// 	// 	}
	// 	// } else {
	// 	// 	console.log('calling the SCSS:');

	// 	// 	let newLink = document.createElement("link");
	// 	// 	newLink.rel = "stylesheet";
	// 	// 	newLink.type = "text/css";
	// 	// 	newLink.id = "langCss";
	// 	// 	newLink.href = bundleName;
	// 	// 	headTag.appendChild(newLink);
	// 	// }
	// 	if(!existingLink) {
	// 		let newLink = document.createElement("link");
	// 			newLink.rel = "stylesheet";
	// 			newLink.type = "text/css";
	// 			newLink.id = "langCss";
	// 			newLink.href = bundleName;
	// 			headTag.appendChild(newLink);
	// 	}
	// }

	ToggleClass() {
		if (this.toggleClass === "ft-maximize") {
			this.toggleClass = "ft-minimize";
		} else {
			this.toggleClass = "ft-maximize";
		}
	}

	toggleSearchOpenClass(display) {
		this.control.setValue("");
		if (display) {
			this.searchOpenClass = 'open';
			setTimeout(() => {
				this.searchElement.nativeElement.focus();
			}, 0);
		}
		else {
			this.searchOpenClass = '';
		}
		this.seachTextEmpty.emit(true);



	}



	toggleNotificationSidebar() {
		this.layoutService.toggleNotificationSidebar(true);
	}

	toggleSidebar() {
		this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
	}

	public logout() {
		this.authService.logout().subscribe((response: Response) => {
			this.authService.removeToken();
			this.authService.routeToLoginPage();
		}, (error) => {
			console.error(error);
			this.authService.removeToken();
			this.authService.routeToLoginPage();
		});
	}

	editProfile(){
		console.log("editProfile");
		this.router.navigate(['editprofiles']);
		  
	}

	addSignPad(){
		console.log("add Sign Pad");
		this.router.navigate(['signiturepath']);
	}
}
