import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})

/**
 * 
 * if you want just user dont pass second argument 
 */
export class AvatarPipe implements PipeTransform {

  transform(avatar : string, isCompany?: ( boolean | undefined  | string)): any {
      
      return avatar ? `/file/${avatar}` : 
             isCompany ? 'assets/img/default-company.svg' : 
            'assets/img/124.svg' ;
  }

}
