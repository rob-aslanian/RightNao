import { Pipe, PipeTransform } from '@angular/core';
import { CONSTANTS } from 'src/app/messaging/shared/constants';

@Pipe({
  name: 'filepath'
})
export class FilepathPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let fileId = value;
    let filepath = CONSTANTS.FILEPATH + '/' + fileId;
    return filepath;
  }

}
