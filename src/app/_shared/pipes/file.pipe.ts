import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'file'
})

export class FilePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
         if( !value || typeof value !== 'string' ) return value;        
         return value.startsWith('blob')  ?  value : `/file/${value}`;
  }

}
