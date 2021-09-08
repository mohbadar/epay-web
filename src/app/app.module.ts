import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { NgbActiveModal, NgbCalendar, NgbCalendarPersian, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule, NgbTimeAdapter } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import { DeviceDetectorModule } from 'ngx-device-detector';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreModule } from "@ngrx/store";
import { DragulaService } from "ng2-dragula";
import { NgxSpinnerModule } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { HttpConfigInterceptor } from './_interceptor/http-config.interceptor';
import {
    PerfectScrollbarModule,
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./template/shared/shared.module";
import * as fromApp from './template/store/app.reducer';
import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./template/layouts/content/content-layout.component";
import { FullLayoutComponent } from "./template/layouts/full/full-layout.component";

import { AuthService } from "./template/shared/auth/auth.service";
import { AuthGuard } from "./template/shared/auth/auth-guard.service";
import { WINDOW_PROVIDERS } from './template/shared/services/window.service';
import { CustomDateParserFormatter } from "./services/custom-dateparserformatter.service";
import { CustomAdapter } from "./services/custom-datepicker-adapter.service";
import { NgbDatepickerI18nPersian } from "./services/datepicker-jalali.service";
import { NgbTimeStringAdapter } from "./services/custom-timeformatter.service";
import { CheckLoginInterceptor } from "./check-login.interceptor";

var firebaseConfig = {
    apiKey: "YOUR_API_KEY", //YOUR_API_KEY
    authDomain: "YOUR_AUTH_DOMAIN", //YOUR_AUTH_DOMAIN
    databaseURL: "YOUR_DATABASE_URL", //YOUR_DATABASE_URL
    projectId: "YOUR_PROJECT_ID", //YOUR_PROJECT_ID
    storageBucket: "YOUR_STORAGE_BUCKET", //YOUR_STORAGE_BUCKET
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID", //YOUR_MESSAGING_SENDER_ID
    appId: "YOUR_APP_ID", //YOUR_APP_ID
    measurementId: "YOUR_MEASUREMENT_ID" //YOUR_MEASUREMENT_ID
};


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent],
    imports: [
        BrowserAnimationsModule,
        StoreModule.forRoot(fromApp.appReducer),
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        ToastrModule.forRoot(),
        NgbModule,
        NgxSpinnerModule,
        DeviceDetectorModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AgmCoreModule.forRoot({
            apiKey: "YOUR_GOOGLE_MAP_API_KEY"
        }),
        PerfectScrollbarModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        DragulaService,
        NgbActiveModal,
        { provide: NgbCalendar, useClass: NgbCalendarPersian },
        { provide: NgbDateAdapter, useClass: CustomAdapter },
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
        { provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter },
        { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpConfigInterceptor,
            multi: true
        },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
        WINDOW_PROVIDERS,
        { provide: HTTP_INTERCEPTORS, useClass: CheckLoginInterceptor, multi: true }

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
