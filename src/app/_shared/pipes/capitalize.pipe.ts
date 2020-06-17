import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!!value){
      let firstLetter = value[0].toLocaleUpperCase()
      return firstLetter + value.slice(1);
    }
    return value;
  }

}
