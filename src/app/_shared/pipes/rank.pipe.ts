import { Pipe, PipeTransform } from '@angular/core';
import { rankTools } from 'src/app/v-office/open-v-office/utils/utils';

@Pipe({
  name: 'rank'
})
export class RankPipe implements PipeTransform {

  transform(value: string, args?: any): any {
       return   rankTools[value] ? rankTools[value] : value;  
  }
}