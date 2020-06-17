import { Pipe, PipeTransform } from '@angular/core';
import { property } from '../../Shared/models/property-types';

@Pipe({
  name: 'property'
})
export class PropertyPipe implements PipeTransform {

  property = property;

  transform(value: any, ...args: any[]): any {
         return  value && property[value] ?  property[value] : value;
  }

}
