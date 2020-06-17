import { Component, OnInit, QueryList, ViewChildren, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { PaymentBoxComponent } from 'src/app/real-estate/add-estate/payment-estate/payment-box/payment-box.component';
import { Observable, merge, forkJoin } from 'rxjs';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegionService } from 'src/app/_shared/region.service';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { AddPetService } from '../../add-pet.service';
import { FORMSMODEL } from '../../models/model';
import { PetService } from '../../pet.service';
import { map, switchMap } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
 

@Component({
  selector: 'app-payment-pets',
  templateUrl: './payment-pets.component.html',
  styleUrls: ['./payment-pets.component.scss']
})
export class PaymentPetsComponent implements OnInit {

  @ViewChildren( PaymentBoxComponent  ) _box: QueryList<PaymentBoxComponent>;

  $countries: Observable<any>;
  utils = utilities;
  payment: FormGroup;
  expire_days: string = '90';

  key: any =  {  Category_Animals: 'animal', Category_Plants: 'plant' , 
  Category_FoodAccessories: 'food', Category_Seeds: "seed" };
  FORMSMODEL = FORMSMODEL;

  @Input() dealType;
  @Input() id;

  @Output() result: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(
    private regionService: RegionService,
    private fb: FormBuilder,
    private fileUploadService: ImageUploadService,
    private AddpetService: AddPetService,
    private petService: PetService,
    private gu: GlobalUserProService
  ) {
    this.payment = fb.group({
      country: ['GE',    Validators.required ],
      currency: ['ALL',  Validators.required ]
    })
   }

  ngOnInit() {
    this.$countries = this.regionService.Countries;   
  }

  makeActive(e: any, index: any ) {   
    this.expire_days = e.price; 
       this._box.map( (box, i) => {
            if( i !== index ) {              
                   box.isSelected = false; 
            } 
       } )
  };


  parseData() {
  

    const information = this.AddpetService.information.value
    
    const input = {
      common: {
        deal_type: this.dealType,
        price: this.AddpetService.price.value['fix_price'] ? this.AddpetService.price.value : undefined ,
        category: this.id,
        expired_days: +this.expire_days,
        post_currency: this.payment.get('currency').value,
        location: {
          city: { id: '5123'  },
          country_id: this.payment.get('country').value
        }
      },
      info: {
        detail: information['detail'],
        phones: information['phones'].map(phone => {
            return {
              country_code_id: +phone.country_code_id,
              number: `${phone.number}`
            }
        })
      },
      [ this.key[this.id] ]: {  }
    };
       let form ;
      if( this.id === 'Category_FoodAccessories' ) {
        // if dealtype has subcategorriees 
        form =  FORMSMODEL[this.id][this.dealType][this.AddpetService.foodCategoryCtrl.value];
      }else{
        form =  FORMSMODEL[this.id][this.dealType];        
      }
 
      form.map( item => {
            if(!item['isCommon']) {
              input[this.key[this.id]] = {...input[this.key[this.id]], [ item.func ]: this.AddpetService[item.func]()};
            }
      } )
      const files = this.removeDimensions(this.AddpetService.files);

      const formData = new FormData();
      files.map((file) => { formData.append('file',file) });

      if( this.AddpetService.isEdit ) {
           const editInput = { ...input, pet_id: this.AddpetService.editId,  
                               company_id: this.gu.isCompanyActive() ? this.gu.getComapnyId() : undefined  };
           const files =   this.AddpetService
                                .deletedFiles.map( id => this.petService.RemovePetFile(this.AddpetService.editId, id) ) ;
            
      return merge(
         this.petService
              .EditPetsPlants(editInput),
        this.fileUploadService.uploadPetsImage(formData, this.AddpetService.editId),
        forkJoin(files)
       ).subscribe( data => console.log(data) )
      }

      this.petService
          .AddPetsPlants(input)
          .pipe(
            map(({ data }) => data['AddPetsPlants']['id']),
            switchMap((id) => this.fileUploadService
                                  .uploadPetsImage(formData, id))
          ).subscribe( data => console.log( data  ) )    
  };

  back() {
     this.result.emit();
  }

  removeDimensions( images: any[] ) {
    const files = [];
         for (let index = 0; index < images.length; index++) {
                for (let j = 0; j < images[index].length; j++) {
                      if(images[index][j]['file'] && images[index][j]['file']['name']) {
                        files.push(images[index][j]['file'])
                      }
                }
         }
    return files;
  };
  
 
}
