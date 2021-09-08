import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class DatatableConfig {

    private languageBadge;
    private tableOptions;
    constructor(private cs: CookieService) {
        if (this.cs.get('lang')) {
            this.languageBadge = this.cs.get('lang');
        } else {
            this.languageBadge = 'en';
        }
        this.initializeTableOptions();
    }


    private _lb() {
        switch (this.languageBadge) {
            case 'en':
                return 'En';
            case 'ps':
                return 'Ps';
            case 'dr':
                return 'Dr';
        }
    }

    private initializeTableOptions() {
        this.tableOptions = {
        }

    }


    public getTableOptions(t) {
        return this.tableOptions[t];
    }

}