import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == 'now') {
      return value;
    } else {
      let dateObj = new Date(value);
      let hours = dateObj.getHours();
      let minutes: any = dateObj.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;

      let strTime = hours + ':' + minutes + ' ' + ampm
      return strTime;
    }
  }
}
