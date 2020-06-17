import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupNotification'
})
export class GroupNotificationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let message = value;
    let conversation = args;
    let participantsIdArr = message.text.split(',');
    let namesCSV = ''
    
    participantsIdArr.forEach(element => {
      let participant = conversation.participants.filter((item) => item.id == element)[0];
      namesCSV = (participant ? participant.name : 'Unknown') + ',' + namesCSV;
    });
    namesCSV.slice(0, -3)

    if (message.type == 'ParticipantLeft') {
      return (namesCSV + ' left the group')
    } else {
      return (namesCSV + ' joined the group')
    }
  }

}
