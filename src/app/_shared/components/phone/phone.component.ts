import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RegionService } from '../../region.service';
import AbrName from '../../../../assets/data/en/countries';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IPhone } from '../../models/company/phone.interface';
import { utilities } from '../../utilities/utilities';




@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

  @Input() multiple: boolean = false;
  @Input() data:IPhone[] | IPhone;
  @Input() disabled:boolean = false;

  @Output() result: EventEmitter<IPhone | IPhone[]> = new EventEmitter<IPhone | IPhone[]>();

  countryCodes: any;
  phonesForm:FormGroup;
  phones:IPhone[] = [];
  utils = utilities;


  constructor(
    private region:RegionService,
    private f:FormBuilder
  ) {
     this.phonesForm = f.group({
       phones:f.array([ this.initaliazeValue() ])
     } )
   }



  initaliazeValue(): FormGroup {
    return this.f.group({
      country_code_id:[''],
      country_code:[''],
      number:['']
    } as IPhone );
  }


  get Phones(){
    return this.phonesForm.get('phones') as FormArray;
  }

  ngOnInit() {
    this.getCountries();

    /// Phones Changed /// 
    this.Phones.valueChanges.subscribe((data:IPhone[]) => {
      
      if(data && data.length > 0){
        this.phones = data.map((phone) : IPhone => {
          let { country_code_id , number } = phone;

          return{
            country_code_id:+country_code_id,
            number:String(number)
          }
 
        })
      }
      
      this.result.emit(this.phones);     
      
    });

    if(this.data){
      this.patchData();
    }
  }

  patchData(){
      this.Phones.removeAt(0); /// Clear form
      this.result.emit(this.data);

 
      
      if(Array.isArray(this.data)){

        this.data.map(phone => {
          this.Phones.push(this.f.group({
              country_code_id:phone.country_code_id,
              number:phone.number
          } as IPhone));
        })
      }else{
        this.Phones.push(this.f.group({
          country_code_id:this.data.country_code_id,
          number:this.data.number
        } as IPhone));
      }

      if(this.disabled){
 
        this.Phones.disable();
      }
  }


  getCountries(){
    this.region.getListOfCountryCodes()
      .subscribe(({ data }) => {
        this.countryCodes = data['getListOfCountryCodes'];
        
        this.countryCodes.map(country => {
          if(AbrName[country['country']]){
            country['country'] = AbrName[country['country']];
          }
          
        });

        this.countryCodes.sort((a,b) => b['country'] < a['country'] ? 1 : -1);
        
      });
  }

  addAnother(){
    this.Phones.push(this.initaliazeValue());
  }

  trackByFn =  (index) => index;

  remove(i:number){ 
    console.log(this.Phones);
    
    this.Phones.removeAt(i);
  }

}
