import { Pipe, PipeTransform } from '@angular/core';
import { utilities } from '../utilities/utilities';

@Pipe({
  name: 'getUrl'
})
export class GetUrlPipe implements PipeTransform {

  transform(value: any): any {
      if (!value) return;

      return utilities.getUrl(value);
  }

}
