import { Pipe, PipeTransform } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';

@Pipe({
  name: 'monthPipe'
})
export class MonthPipe implements PipeTransform {

  transform(value: string): any {
    let Months = [{ "id": 1, "name": 'January' }, { "id": 2, "name": 'February' }, { "id": 3, "name": 'March' }, { "id": 4, "name": 'April' }, { "id": 5, "name": 'May' }, { "id": 6, "name": 'June' }, { "id": 7, "name": 'July' }, { "id": 8, "name": 'August' }, { "id": 9, "name": 'September' }, { "id": 10, "name": 'October' }, { "id": 11, "name": 'November' }, { "id": 12, "name": 'December' }];  
    let arr = value.split('-');
    let monthName: any;
    let result: any;


    if(value === '' || !value) return '';

    if(arr.length == 2){
       for(let i=0; i<Months.length; i++){
         if( Number(arr[0])  == Months[i].id ){
            monthName = Months[i].name;
            break;
         }
       }
       result = monthName+" "+arr[1];
       return result;
    }
    else if(arr.length == 3){
        for(let i=0; i<Months.length; i++){
            if( Number(arr[1])  == Months[i].id ){
                monthName = Months[i].name;
                break;
            }
        }
        result = arr[0]+" "+monthName+" "+arr[2];
       return result;
    }
    
  }

}