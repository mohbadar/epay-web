import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
    name: 'jalali'
})
export class JalaliPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        console.log('The date is : ', value);
        
        if (value !== null && value !== '' && value !== undefined) {
            let MomentDate = moment(value, 'YYYY-MM-DD');
            return MomentDate.locale('fa').format('YYYY-M-D');
        }
        return value;
    }
}

//  use it in component template <div>{{ loadedData.date | jalali }}</div>
