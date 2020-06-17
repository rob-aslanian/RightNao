import { Pipe, PipeTransform } from '@angular/core';
import { CarsProperties } from '../../models/carsproperty.model';

@Pipe({
  name: 'property'
})
export class PropertyPipe implements PipeTransform {
  property = CarsProperties;

  transform(value: any, ...args: any[]): any {
    return value && this.property[value] ? this.property[value] : value;
  }

}