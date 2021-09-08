import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class TranslatedToastrService {

    constructor(
        private translateService: TranslateService,
        private toastr: ToastrService
       ) {

    }

    success(title, message, language = 'dr') {
        if (language !== 'en') {
            this.toastr.success(this.translateService.instant(message), this.translateService.instant(title), {
              positionClass: 'toast-top-left',
            });
        } else {
          this.toastr.success(message, title);
        }
      }
    
    error(title, message, language = 'dr') {
      if (language !== 'en') {
        this.toastr.error(this.translateService.instant(message), this.translateService.instant(title), {
          positionClass: 'toast-top-left',
        });
      } else {
        this.toastr.error(message, title);
      }
    }

}