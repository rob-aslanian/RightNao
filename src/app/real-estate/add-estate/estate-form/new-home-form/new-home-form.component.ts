import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstateFormService } from '../../Service/estate-form.service';
import { PropertyType_NewHomes, who_will_live } from '../../../Shared/models/estate-model';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { addRealEstate } from '../models/add-estate.model';
import { RealEstateService } from '../../Service/real-estate.service';
 
@Component({
  selector: 'app-new-home-form',
  templateUrl: './new-home-form.component.html',
  styleUrls: ['./new-home-form.component.scss']
})
export class NewHomeFormComponent implements OnInit {

  home = PropertyType_NewHomes;
  who_will_live = who_will_live;
  form: FormGroup;
  categoryId: string ;
  companyId: string ;
  catId: string;
  subCatId: string;
  
  type: any = {
    PropertyType_NewHomes: 'Type of New home',
    PropertyType_Houses: 'Type of House',
    PropertyType_Homes: 'Type of Home',
    PropertyType_Appartments: 'Type of Apartaments'
  };

  title: string = '';


  constructor(
   private activatedRouter: ActivatedRoute,
   private estateFormService: EstateFormService,
   private globalUserProService: GlobalUserProService,
   private router: Router,
   private estateService: RealEstateService
  ) {
        this.categoryId =  this.activatedRouter.snapshot.params['catId'];
        this.companyId = globalUserProService.isCompanyActive() &&
                         globalUserProService.getComapnyId();
   };

  ngOnInit() { 
        const params =   this.activatedRouter.snapshot.params;
        this.catId = params['catId'];
        this.subCatId = params['subCatId'];
        this.title = this.type[this.subCatId];
   }
 
  
  logValue( ) {
 
      this.estateFormService
          .sumbitted.next(true);

      if( !this.estateFormService.isInvalid( this.home ) ||
           this.estateFormService.status.invalid  ||
           this.estateFormService.specsForm.invalid || 
           this.estateFormService.information.invalid ||
          (this.catId === 'DealType_Rent' && this.estateFormService.date.invalid ) || 
           this.estateFormService.basicForm.invalid || 
           this.validateWhoWillLive()) {
                 return   window.scrollTo({behavior: 'smooth', top: 0});
          };

         
          
          const from = this.estateFormService.date.get('dateFrom').value;
          const to = this.estateFormService.date.get('dateTo').value;

          const input: addRealEstate  = {
                company_id: this.companyId ? this.companyId : undefined,
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
                badrooms: +this.estateFormService.specsForm.get('badrooms').value,
                bathrooms: +this.estateFormService.specsForm.get('bathrooms').value,
                total_area: +this.estateFormService.specsForm.get('totalArea').value,
                car_spaces: +this.estateFormService.specsForm.get('carSpecs').value,
                metrict_type: this.estateFormService.specsForm.get('metrics').value,
                outdoor_features:   this.home.outdoor_features.filter( field => field.checked ).map(field => field.id),
                indoor_features:  this.home.indoor_features.filter( field => field.checked ).map(field => field.id), 
                climat_control: this.home.climat_control.filter( field => field.checked ).map(field => field.id),
                type_of_property:  this.home.type_of_property.filter( field => field.checked ).map(field => field.id),
                availability_from: this.catId === 'DealType_Rent' ?  `${from.year}-${from.month}-${from.day}` : undefined,
                availability_to:   this.catId === 'DealType_Rent' ? `${to.year}-${to.month}-${to.day}` : undefined,
                is_agent: this.estateFormService.information.value === "By_agents_only" ? true : false,
                has_repossesed: this.estateFormService.hasReppositoryPropert.value,      
                who_live: this.catId !== 'DealType_Rent' ? who_will_live.filter( field => field.checked ).map(field => field.id) : undefined     
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

  validateWhoWillLive() {
      if( this.catId === 'DealType_Lease' ) {
            return this.who_will_live.filter(item => item.checked ).length === 0 ? true : false;
      }
      return false;
  }


  goBack() {
    this.estateService
        .step.next('back');
    history.back();
  }

}
