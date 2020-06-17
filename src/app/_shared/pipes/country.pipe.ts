import { Pipe, PipeTransform } from '@angular/core';
import { utilities } from '../utilities/utilities';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {
 utils = utilities;
  transform(value: any, args?: any): any {
     return value ? 
      this.utils.getCountryName(value) : value; 
  }

}
