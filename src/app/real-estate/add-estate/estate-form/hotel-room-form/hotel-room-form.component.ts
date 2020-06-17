import { Component, OnInit } from '@angular/core';
import { addRealEstate } from '../models/add-estate.model';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstateFormService } from '../../Service/estate-form.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { RealEstateService } from '../../Service/real-estate.service';

@Component({
  selector: 'app-hotel-room-form',
  templateUrl: './hotel-room-form.component.html',
  styleUrls: ['./hotel-room-form.component.scss']
})
export class HotelRoomFormComponent implements OnInit {
  
  categoryId: string ;
  companyId: string ;
  catId: string;
  subCatId: string;
  hotelForm: FormGroup;
  isSubmitted: boolean = false;

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
        this.hotelForm = estateFormService.hotelForm;
   };

  ngOnInit() { 
      const params =   this.activatedRouter.snapshot.params;
      this.catId = params['catId'];
      this.subCatId = params['subCatId'];
 
   }
 
  
  logValue( ) {
 
      this.isSubmitted = true;
      this.estateFormService
          .sumbitted.next(true);

      if(  this.estateFormService.status.invalid  || this.estateFormService.information.invalid ||
           this.estateFormService.date.invalid ||  this.estateFormService.basicForm.invalid || this.hotelForm.invalid ) {
                 return   window.scrollTo({behavior: 'smooth', top: 0});
          }

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
                  availability_from: `${from.year}-${from.month}-${from.day}`,
                  availability_to: `${to.year}-${to.month}-${to.day}`,
                  is_agent: this.estateFormService.information.value === "By_agents_only" ? true : false,
                  has_repossesed: this.estateFormService.hasReppositoryPropert.value,    
                  ...this.hotelForm.value           
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
