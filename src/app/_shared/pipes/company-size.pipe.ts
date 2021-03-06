import { Pipe, PipeTransform } from '@angular/core';
import { utilities } from '../utilities/utilities';

@Pipe({
  name: 'companySize'
})
export class CompanySizePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) return;

    return utilities.getCompanySizeName(value);
  }

}
