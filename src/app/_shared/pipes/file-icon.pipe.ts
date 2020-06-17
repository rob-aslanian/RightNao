import { Pipe, PipeTransform } from '@angular/core';
import { utilities } from '../utilities/utilities';

@Pipe({
  name: 'fileIcon'
})
export class FileIconPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if ( !value ) return;
      
      return utilities.setIconByType(value);
  }

}
