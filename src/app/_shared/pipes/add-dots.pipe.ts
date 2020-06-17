import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "addDots"
})
export class AddDotsPipe implements PipeTransform {

  /**
   *
   * @param value     Get items
   * @param slice     Slice item.title Value
   */

  transform(value: string, slice: number): any {
    if ( value && value.length >= slice) {
      return `${ value.slice(0, slice -3 ) } ...`;
    }
    return value;
  }
}
