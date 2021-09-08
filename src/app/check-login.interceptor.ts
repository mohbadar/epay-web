import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class CheckLoginInterceptor implements HttpInterceptor {
    constructor(
        private router: Router
    ) {
    }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth_token');
    let payload;
    if (token && token != "undefined") {
        console.log("has token");
        payload = token.split('.')[1];
        payload = window.atob(payload);
        const parsePayload = JSON.parse(payload);
        if (parsePayload.exp > Date.now() / 1000) {
            return next.handle(httpRequest);
        } else {
            localStorage.removeItem("auth_token");
            this.router.navigate(["/login"]);
            return;
        }
    } else {
        console.log("has no token");
        return next.handle(httpRequest);
    }
  }
}