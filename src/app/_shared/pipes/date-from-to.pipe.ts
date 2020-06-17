import { Pipe, PipeTransform } from '@angular/core';
import { utilities } from '../utilities/utilities';

@Pipe({
  name: 'dateFromTo'
})
export class DateFromToPipe implements PipeTransform {

  transform(from: string | Date , to: string | Date): any {
    
    return utilities.dateFromTo(from , to);
  }

}
