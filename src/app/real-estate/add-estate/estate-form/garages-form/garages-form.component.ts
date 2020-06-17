import { Component, OnInit } from '@angular/core';
import { PropertyType_Garages } from '../../../Shared/models/estate-model';
import { EstateFormService } from '../../Service/estate-form.service';
import { FormGroup } from '@angular/forms';
import { addRealEstate } from '../models/add-estate.model';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Router } from '@angular/router';
import { RealEstateService } from '../../Service/real-estate.service';


@Component({
  selector: 'app-garages-form',
  templateUrl: './garages-form.component.html',
  styleUrls: ['./garages-form.component.scss']
})
export class GaragesFormComponent implements OnInit {

  PropertyType_Garages = PropertyType_Garages;
  totalArea: FormGroup;
  company_id: string;
  isCompanyActive: boolean;
  isSubmitted: boolean = false ;
  
  constructor(
    private estateFormService: EstateFormService,
    private globalUserProService: GlobalUserProService,
    private router: Router,
    private estateService: RealEstateService
  ) {
      this.totalArea = estateFormService.totalArea;
      this.company_id = globalUserProService.isCompanyActive() &&
                        globalUserProService.getComapnyId();
   }

  ngOnInit() {
  }

  logValue( ) {
 
    this.isSubmitted = true;
    this.estateFormService
        .sumbitted.next(true);

    if(  this.estateFormService.status.invalid  || this.estateFormService.information.invalid ||
         this.estateFormService.date.invalid ||  this.estateFormService.basicForm.invalid || this.totalArea.invalid || 
         !this.estateFormService.isInvalid(this.PropertyType_Garages) ) {
               return   window.scrollTo({behavior: 'smooth', top: 0});
        }

        const from = this.estateFormService.date.get('dateFrom').value;
        const to = this.estateFormService.date.get('dateTo').value;

          
          const input: addRealEstate  = {
                company_id: this.company_id ? this.company_id : undefined,
                rental_detail: [{
                    description:  this.estateFormService.basicForm.get('description').value,
                    house_rules: this.estateFormService.basicForm.get('house_rule').value,
                    title: this.estateFormService.basicForm.get('title').value,
                }],
                phones: this.estateFormService.basicForm.get('phones').value.map( (phone) =>{
                  return {
                    country_code_id: +phone.country_code_id,
                     number: phone.number.toString()
                  }
               } ),
                price: {
                  price_type: this.estateFormService.basicForm.get('price').value,
                  min_price:  +this.estateFormService.basicForm.get('enterPrice').value,
                  max_price:  0,
                  currency: this.estateFormService.basicForm.get('currency').value
                },
                status: this.estateFormService.status.value,
                availability_from: `${from.year}-${from.month}-${from.day}`,
                availability_to: `${to.year}-${to.month}-${to.day}`,
                additional_filters: this.PropertyType_Garages.addational_filters ?  
                                    this.PropertyType_Garages.addational_filters.filter( field => field.checked ).map(field => field.id) : [],
                is_agent: this.estateFormService.information.value === "By_agents_only" ? true : false,
                has_repossesed: this.estateFormService.hasReppositoryPropert.value, 
                total_area: +this.totalArea.get('total_area').value,
                metrict_type: this.totalArea.get('metrict_type').value
          };
 
      this.estateFormService
          .formInput.next({
              rental_info: {
                ...this.estateFormService.dealTypeInput.getValue(),
                expired_days: 0,
                post_currency: ''
              },
               ...input
          });
          this.estateService.step.next('next');

      this.router
          .navigate(['real-estate', 'add-estate', 'payment']);
     }

     goBack() {
      this.estateService
          .step.next('back');
      history.back();
    }
}
