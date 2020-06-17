import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personalize'
})
export class PersonalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value.replace(new RegExp('___', 'g'), args));
  }

}
