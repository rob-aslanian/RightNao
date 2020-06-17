import { Pipe, PipeTransform } from '@angular/core';
import { utilities } from '../utilities/utilities';

@Pipe({
  name: 'companyAddress'
})
export class CompanyAddressPipe implements PipeTransform {

  transform(address: any[], args?: any): any {

      if(address.length > 0){
        let addr = address.find(addr => addr.primary);
        return `${addr.city.city} , ${ utilities.getCountryName(addr.country_id) }`;
      }

      return '';
    
  }

}
