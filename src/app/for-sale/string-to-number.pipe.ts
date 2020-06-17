import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToNumber'
})
export class StringToNumberPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    console.log(value, +value);
    
       return +value;
  }

}
