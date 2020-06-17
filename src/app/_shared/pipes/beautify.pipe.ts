import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautify'
})
export class BeautifyPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    console.log(value);
    
     if ( !value && value.length <= 1) return;

    
     /// Remove '_' 
     if(value.includes('_')){
       value = value.replace(/_/gi , " " );
     }

     return value;
  }

}
