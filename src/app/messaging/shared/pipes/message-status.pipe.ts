import { Pipe, PipeTransform } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service';

@Pipe({
  name: 'messageStatus',
  pure: false
})
export class MessageStatusPipe implements PipeTransform {

  constructor(
    private cookieService: CookieService,
    private graphQLMappingService: MappingService,
  ) { }

  transform(value: any, args?: any): any {
    let currentUserId = this.graphQLMappingService.isCompany ? this.graphQLMappingService.companyId : this.cookieService.get('user_id');
    let message = value;
    let seenByArr = message.seen_by ? message.seen_by.filter((item)=>item !== currentUserId) : [];
    let receivedByArr = message.received_by ? message.received_by.filter((item)=>item !== currentUserId) : [];

    if (!seenByArr || seenByArr.length == 0) { // seeny is null or blank, check for received
      if (!receivedByArr || receivedByArr.length == 0) { // if not received, then set red aeroplane
        return 'not-sent'
      } else {
        return 'sent'
      }
    } else {
      
      return 'seen'
    }
  }

}
