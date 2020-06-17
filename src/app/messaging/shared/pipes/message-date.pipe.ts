import { Pipe, PipeTransform } from '@angular/core';
import { CONSTANTS } from 'src/app/messaging/shared/constants'

import * as moment from 'moment';

@Pipe({
  name: 'messageDate'
})
export class MessageDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let dateObj = new Date(value);
    // let formatted = dateObj.getDate() + ' ' + (CONSTANTS.MONTHS[dateObj.getMonth()])  + ', ' + dateObj.getFullYear();
    let formatted =  moment(dateObj).format('LL');//(dateObj.getMonth() + 1 ) + '/' +  dateObj.getDate()  + '/' + dateObj.getFullYear();
    return formatted;
  }

}
