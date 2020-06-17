import { Injectable } from '@angular/core';
import { FormControl, Validators, FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class AddPetService {

   files: any[] = [];
   deletedFiles: any[] = [];
   isEdit: boolean = false;
   editId: string;

   isSubmitted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   aniCtrl: FormControl = new FormControl('', Validators.required);
   breedCtrl: FormControl = new FormControl('', Validators.required);
   day: FormControl = new FormControl('Age_Day', Validators.required);
   ageCtrl: FormControl = new FormControl('', Validators.required);
   location: FormControl = new FormControl('', Validators.required);
   pet_serviceCtrl: FormControl = new FormControl('', Validators.required);
   petCtrl: FormControl = new FormControl('', Validators.required);


   gardenCtrl: FormControl = new FormControl('', Validators.required);
   subCtrl: FormControl = new FormControl('Food_SubCategory_FruitAndVegetableFertilizer');
   orgCntrl: FormControl = new FormControl('');
   foodCtrl: FormControl = new FormControl('');
   animalFoodCtrl: FormControl = new FormControl('');
   organicCtrl: FormControl = new FormControl('Food_SubCategory_FruitAndVegetableFertilizer');
   isOrganicCtrl: FormControl = new FormControl('organic');


   seedsCtrl: FormControl = new FormControl('', Validators.required);

   planting: FormGroup = new FormGroup({
      planting_time: new FormArray([])
   })

   lightCtrl: FormControl = new FormControl('LightNeed_FullShade');
   waterCtrl: FormControl = new FormControl('WaterNeed_High');
   landCtrl: FormControl = new FormControl('LandScapeUsed_Accent');
   flowerCtrl: FormControl = new FormControl('Season_Spring');
   foodCategoryCtrl: FormControl = new FormControl('');

   price: FormGroup = new FormGroup({
      fix_price: new FormControl('', Validators.required),
      currency: new FormControl('GEL')
   })

   information: FormGroup = new FormGroup({
      phones: new FormArray([]),
      detail: new FormGroup({
         title: new FormControl('', Validators.required),
         description: new FormControl('', Validators.required)
      })
   });

   transported: FormControl = new FormControl(false);


   genderCtrl: FormControl = new FormControl('Gender_Male');

   colorCtrl: FormControl = new FormControl('#FCFFD2');

   sizeCtrl: FormControl = new FormControl('Size_Small');

   currency: FormControl = new FormControl('');


   constructor() { };

   animal_category() {
      return this.aniCtrl.value;
   };

   breed() {
      return this.breedCtrl.value;
   };

   gender() {
      return this.genderCtrl.value;
   };

   age() {
      return this.ageCtrl.value;
   };

   age_type() {
      return this.day.value
   };

   color() {
      return this.colorCtrl.value
   };

   size() {
      return this.sizeCtrl.value;
   }

   can_transported() {
      return this.transported.value;
   }

   pet_service() {
      return this.pet_serviceCtrl.value;
   }
   plant_type() {
      return this.petCtrl.value;
   }

   light_need() {
      return this.lightCtrl.value;
   }

   water_need() {
      return this.waterCtrl.value;
   }
   landscape_used() {
      return this.landCtrl.value;
   }

   season() {
      return this.flowerCtrl.value;
   }

   food_category() {
     return this.foodCategoryCtrl.value;
   }
   food_sub_category() {
      return this.subCtrl.value;
   }
   animal_food() {
     return this.foodCtrl.value;
   }

   garden_supplies() {
      return this.gardenCtrl.value;
   }

   organic() {
      return this.organicCtrl.value;
   }
   
   is_organic() {
      return this.isOrganicCtrl.value === 'organic' ? true : false; 
   }

   seeds_category() {
      return this.seedsCtrl.value;
   }
   planting_time() {
      return this.planting.get('planting_time').value.map((item) => {
            if( item.checked ) {
                 return item.id
            } 
      }).filter(( item ) => item); 
   };

   setPhones(phones) {
      const phone = this.information.get('phones') as FormArray;
      phones.map( item => {
            phone.push(new FormGroup({
               country_code_id: new FormControl(item.country_code_id , Validators.required),
               number: new FormControl(item.number , Validators.required)
            }))
      } )
   };
  

}
