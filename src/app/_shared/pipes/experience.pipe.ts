import { Pipe, PipeTransform } from '@angular/core';
import { utilities } from '../utilities/utilities';

@Pipe({
  name: 'experience'
})
export class ExperiencePipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if (!value) return;


      return utilities.getExerienceName(value);
  }

}
