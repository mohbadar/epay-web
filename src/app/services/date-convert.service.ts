import { Injectable } from "@angular/core";
import * as moment from 'jalali-moment';

@Injectable({
    providedIn: 'root'
})
export class DateConvertService {
    
    public convertToDariDate(date) {
        console.log(moment(date, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD'));
        return moment(date, 'YYYY-MM-DD').locale('fa').format('YYYY-MM-DD');
    }

    public convertToGregorianDate(date) {
        return moment.from(date, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD');
    }

    /**
     * This method calculates the age from a date
     * @param birthday the birth date in `Gregorian` date to calculate the age from.
     */
    calculateAge(birthday) { // birthday is a date
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

    /**
     * This method calculates an approximate brith date from the age in `Gregorian` date.
     * The day andm month as taken from today's date.
     * @param age age to calculate the birth date from
     */
	calculateBirthDate(age) {
		const date = new Date();
		const dateValue = (Number(date.getUTCFullYear()) - Number(age)) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)

		return dateValue;
    }
    
    /**
     * This method extracts the day, month and year in YYYY-MM-DD format
     */
    getFormattedDate(date: string) {
        const d = new Date(date);
        return d ? `${d.getFullYear()}-${d.getDate()}-${d.getDay()}`: null;
    }
}