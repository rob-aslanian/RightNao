import { Pipe, PipeTransform } from '@angular/core';
import { utilities } from '../utilities/utilities';

@Pipe({
  name: 'industry'
})
export class IndustryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return;

    return utilities.getInudsryName(value);
  }

}
