import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (/\bhttps?:\/\/\S+/gi.test(value)) {
       return `<a href="${value}" target="_blank" class="text-white" >${value}</a>`
    } else if (!args) {
      return value
    }

    var re = new RegExp(args, 'gi');
    return value.replace(re, '<mark>' + args + '</mark>');
  }

}
