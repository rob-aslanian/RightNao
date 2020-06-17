import { Pipe, PipeTransform } from '@angular/core';
import { order_status, statusEmum } from '../models/service/v-office/v-office-model';

@Pipe({
  name: 'status'
})

export class StatusPipe implements PipeTransform {

  transform( value: order_status ): any {
    
    return statusEmum[value] ? 
           statusEmum[value] :
           value ;
  }

}
