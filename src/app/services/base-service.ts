import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'jalali-moment';

@Injectable({
    providedIn: "root",
})
export class BaseService {

    departments = null;
    issuingAuthorities = null;
    categories = null;
    entities = null;
    organizationTypes = null;
    organizations = null;
    documentTypes = null;

    constructor(private http: HttpClient,
        private dateAdapter: NgbDateAdapter<string>,
        private calendar: NgbCalendar,) { }

    public parseDateObject(dateObj) {
        let date = "";
        if (dateObj) {
            let d = dateObj.dayOfMonth + "-" + dateObj.month + "-" + dateObj.year;
            let t = dateObj.hour + ":" + dateObj.minute + ":" + dateObj.second;
            date = d + " " + t;
        }
        return date;
    }

    public parseDateObjectAsDate(dateObj) {
        let date = "";
        if (dateObj) {
            let d = dateObj.year + "-" + dateObj.monthValue + "-" + dateObj.dayOfMonth;
            date = d;
        }
        return date;
    }

    public parseDateObjectAsDateTime(dateObj) {
        let date = "";
        if (dateObj) {
            let d = dateObj.year + "-" + dateObj.monthValue + "-" + dateObj.dayOfMonth;
            d += " " + dateObj.hour + ":" + dateObj.minute + ":" + dateObj.second;
            date = d;
        }
        return date;
    }

    public parseTimeObjectAsTime(dateObj) {
        let date = "";
        if (dateObj) {
            let d = dateObj.hour + ":" + dateObj.minute + ":" + dateObj.second;
            date = d;
        }
        return date;
    }

    public parseDateObjectAsJalaliDateFormat(dateObj) {
        let date = "";
        if (dateObj) {
            let d = dateObj.year + "-" + dateObj.monthValue + "-" + dateObj.dayOfMonth;
            date = d;
        }
        return date;
    }

    getTodayDate() {
        let currentDate = new Date();
        let month = '' + (currentDate.getMonth() + 1);
        let day = '' + currentDate.getDate();
        let year = currentDate.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    getHijriTodayDate() {
        return this.dateAdapter.toModel(this.calendar.getToday());
    }

    addZero(val) {
        // adding 0 if the value is a single digit
        return `0${val}`.slice(-2);
    }

    getCurrentTime() {
        let currentDate = new Date();
        return this.addZero(currentDate.getHours()) + ":" + this.addZero(currentDate.getMinutes()) + ":" + this.addZero(currentDate.getSeconds());
    }

    public getEntityList(): Observable<any> {
        if (!this.entities) {
            return this.http.get("/api/_admin/departments/entities").pipe(
                map((data: any) => {
                    console.log(data);
                    return this.entities = data;
                })
            );
        } else {
            return of(this.entities);
        }
    }

    public getDepartmentList(): Observable<any> {
        if (!this.departments) {
            return this.http.get("/api/_admin/departments/").pipe(
                map((data: any) => {
                    return this.departments = data;
                })
            );
        } else {
            return of(this.departments);
        }
    }

    public getIssuingAuthorityList(): Observable<any> {
        if (!this.issuingAuthorities) {
            return this.http.get("/api/_admin/issuing-authorities/").pipe(
                map((data: any) => {
                    return this.issuingAuthorities = data;
                })
            );
        } else {
            return of(this.issuingAuthorities);
        }
    }

    public getDistrictList(pId): Observable<any> {
        const PARAMS = new HttpParams({});
        return this.http.get("/api/districts/province", { params: PARAMS.set('pId', pId) });
    }

    public getCategoryList(): Observable<any> {
        if (!this.categories) {
            return this.http.get("/api/_admin/document-categories/").pipe(
                map((data: any) => {
                    return this.categories = data;
                })
            );
        } else {
            return of(this.categories);
        }
    }

    getSubDepartmentList(pId): Observable<any> {
        return this.http.get(`/api/_admin/departments/sub`, {
            params: { pId }
        });
    }

    public getOrgTypeList() {
        if (!this.organizationTypes) {
            return this.http.get("/api/_admin/organization_types").pipe(
                map((data: any) => {
                    return this.organizationTypes = data;
                })
            );
        } else {
            return of(this.organizationTypes);
        }
    }

    public getOrgList() {
        if (!this.organizations) {
            return this.http.get("/api/_admin/organizations").pipe(
                map((data: any) => {
                    return this.organizations = data;
                })
            );
        } else {
            return of(this.organizations);
        }
    }

    public convertToDariDate(date) {
        if (date) {
            return moment(date, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');
        }
        return null;
    }

    public convertToGregorianDate(date) {
        if (date) {
            const d = date;
            return moment.from(d, 'fa', 'YYYY-MM-DD').format('YYYY-MM-DD');
        }
        return null;
    }

    searchUser(term: string) {
        if (term === '') {
            return of([]);
        }

        const PARAMS = new HttpParams({});
        return this.http.get<[any, string[]]>('/api/users/search', { params: PARAMS.set('term', term) }).pipe(
            map(response => response)
        );
    }

}
