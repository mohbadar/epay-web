import { Injectable } from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

const WEEKDAYS_SHORT = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];
const MONTHS = ['حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله', 'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت'];

@Injectable()
export class NgbDatepickerI18nPersian extends NgbDatepickerI18n {
    getWeekdayShortName(weekday: number) { return WEEKDAYS_SHORT[weekday - 1]; }
    getMonthShortName(month: number) { return MONTHS[month - 1]; }
    getMonthFullName(month: number) { return MONTHS[month - 1]; }
    getDayAriaLabel(date: NgbDateStruct): string { return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`; }
}
