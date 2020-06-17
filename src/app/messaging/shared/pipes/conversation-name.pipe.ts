import { Pipe, PipeTransform } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Pipe({
  name: 'conversationName',
  pure: false
})
export class ConversationNamePipe implements PipeTransform {

  constructor(
    private cookieService: CookieService
  ) { }

  transform(conversation: any, args?: any): any {
    if (conversation.is_group) {
      if (conversation.name == '') {
        let namesArr = [];
        let displayName = '';
        let maxNames = 3;

        conversation.participants.forEach((item) => {
          if (!item.has_left) {
            namesArr.push(item.name)
          }
        })

        let counter = 0
        while(counter < maxNames && counter <= (namesArr.length - 1)){
          displayName = namesArr[counter] + ', ' + displayName;
          counter++;
        }

        displayName = displayName.slice(0, -2);
        if (namesArr.length > maxNames) {
          displayName = displayName + ` & ${namesArr.length - maxNames} others`
        }

        return displayName;
      } else {
        return conversation.name;
      }
    } else {
      let loggedInUserId = this.cookieService.get('user_id');
      let participant = conversation.participants.filter((item) => item.id !== loggedInUserId)[0];
      return participant.name;
    }
  }
}
