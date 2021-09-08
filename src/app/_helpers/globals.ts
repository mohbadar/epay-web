import { Injectable } from '@angular/core';
import { Principal } from './../_models/principal';
import { Preferences } from './../_models/preferences';

@Injectable({
    providedIn: 'root'
})
export class Globals {
    lang: string = 'en';
    dir: string = 'ltr';

    dark: boolean = false;
    boxed: boolean = false;
    collapsed: boolean = false;
    landing_page;

    principal: Principal = new Principal(null, [], [], [], null, null, '', '', '', null, '', null, null, true, []);
    preferences: Preferences = new Preferences(true, false, false, 'red', '../../../assets/img/full-screen-image-2.jpg', 10);
    // preferences: Preferences = new Preferences(null, null, null, null, '', null);
}