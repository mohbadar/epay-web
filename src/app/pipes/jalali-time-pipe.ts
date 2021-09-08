import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
    name: 'jalaliTime'
})
export class JalaliTimePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        console.log('The date is : ', value);
        
        if (value !== null && value !== '' && value !== undefined) {
            let MomentDate = moment(value, 'YYYY-MM-DDTHH:mm:ss');
            let date = MomentDate.locale('fa').format('YYYY-M-D HH:mm:ss');

            // get time from the date
            // const mDate = new Date(value);

            // date = `${date} ${mDate.getHours()}:${mDate.getMinutes()}:${mDate.getSeconds()}`;

            return date;
        }
        return value;
    }
}

//  use it in component template <div>{{ loadedData.date | jalali }}</div>
