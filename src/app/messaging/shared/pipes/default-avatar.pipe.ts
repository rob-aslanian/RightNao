import { Pipe, PipeTransform } from '@angular/core';
import { CONSTANTS } from 'src/app/messaging/shared/constants'

@Pipe({
  name: 'defaultAvatar'
})
export class DefaultAvatarPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == '' || value == null) {
      return './assets/img/defaultAvatar.svg'
    } else {
      let imageUrl = (value.indexOf('http') !== -1) ? value : (CONSTANTS.FILEPATH2 + '/' + value);
      return imageUrl
    }

  }

}
