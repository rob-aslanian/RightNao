import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mimeType'
})
export class MimeTypePipe implements PipeTransform {
  // get mime type of file and return type of content
  transform(mimeType: any, args?: any): any {
       return  mimeType ? mimeType.split('/')[0] : '';
  }

}
