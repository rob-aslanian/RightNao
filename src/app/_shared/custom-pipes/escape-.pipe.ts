import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class EscapePipe implements PipeTransform {

  transform(value: string, args?: string): any {
    args ? args : args = "";
    let reg =  RegExp(args, 'g');
    let str = value.replace(reg," ");
    return str;
  }

}
