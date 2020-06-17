import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ILocation } from 'src/app/_shared/models/company/location.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IBuisnessHour } from 'src/app/_shared/models/businessHours.interface';
import { IPhone } from 'src/app/_shared/models/company/phone.interface';
import { RegionService } from 'src/app/_shared/region.service';
import { LocationService } from 'src/app/_shared/services/companies/location.service';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, switchMap, filter } from 'rxjs/operators';
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {

  private _data:ILocation;
  @Output() result:EventEmitter<ILocation> = new EventEmitter<ILocation>();
  
  @Input() companyId:string;
  @Input() 
          set data(value:ILocation){
            this._data = value;

            if(value){
              this.patchData();
            }
          }
          get data() : ILocation{
            return this._data;
          }

  @Input() type:string;

  locationForm:FormGroup;
  countries:Observable<any>;
  cities: any[];


  selectedCountry:string = null;
  selectedCity:any = null;
  submited:boolean = false;

  locationChanges: ILocation = {
    apartment:null,
    street_address:null,
    state:null,
    phones:[],
    business_hours:[],
    city_id:-1,
    primary:false,
    name:null,
    zip_code:null,
    city:{
      city:null
    }
  };
  
  busniessHoursData:IBuisnessHour[];
  phonesData:IPhone[];
  utils = utilities;

  constructor(
    private f :FormBuilder,
    private region:RegionService,
    private locationService:LocationService
  ) {
    this.locationForm = f.group({
       name:['' , PasswordValidation.detectOnlyEnglishCharacters()],
       street_address:['' , Validators.compose([Validators.required , PasswordValidation.detectOnlyEnglishCharacters()])],
       apartment:['' , Validators.compose([Validators.required , PasswordValidation.detectOnlyEnglishCharacters()])],
       state:[{value:'' , disabled:true} , Validators.compose([Validators.required , PasswordValidation.detectOnlyEnglishCharacters()])],
       country_id:['' , Validators.required],
       city_id:[{value:'', disabled:!this.selectedCountry} , Validators.compose([Validators.required , PasswordValidation.detectString()])],
       zip_code:['' ,  Validators.compose([Validators.required , PasswordValidation.detectNumberAndSymbols()])],
       primary:[false]

    })
   }

  ngOnInit() {
    /// Get list of countries ///
    this.countries = this.region.Countries;

    /// Disable city ///
    this.disableCity();
  }


  get location(){
    return this.locationForm.controls;
  }


  disableCity(){
    this.location['country_id']
        .valueChanges
        .subscribe(
          (country) => !country ? this.location['city_id'].disable() :  
                                  this.location['city_id'].enable()
        )
  }

  patchData(){

      
      let { 
        business_hours,country_id,
        city,geo_pos,id , phones
       } = this.data;



       this.locationChanges = this.data;

       /// Parse city and country ///
       if(city){
         this.selectedCity = city;
         this.locationForm.get('city_id').setValue(city.id);
         this.locationForm.get('state').setValue(city.subdivision);
         this.locationChanges.city_id = city.id;
       }
       this.selectedCountry = country_id;
       this.location['city_id'].enable();
      

       /// Parse busniess hours ///
       this.busniessHoursData = business_hours;

       /// Parse phones ///
       this.phonesData = phones;

       let controls = Object.keys(this.locationForm.controls);

       /// Parse values to form by keys ///
       if(controls && controls.length > 0){
         controls.map(control => {
            if(this.data[control]){
              this.locationForm.patchValue({
                [control]:this.data[control]
              })
            }
         })
       } 

  }

  clearForm(){
    this.locationForm.reset();
    this.busniessHoursData = null;
    this.phonesData = null;
  }

  removeLocation(){

     this.locationService
         .removeLocation(this.companyId , this.data.id)
         .subscribe((data) => {
                this.result.emit({
                  ...this.locationChanges,
                  _close:true,
                  _type:'delete'
                })

              },(err) => {  }
            );
  }


  selectCountry(e){
    let target = e.target;
    
    target ? this.selectedCountry = target.value : null;

    /// Reset city ///
    this.selectedCity = '';
  }

  selectCity(e:NgbTypeaheadSelectItemEvent){

    if(!e || !e.item){
        return;
    }

  
    this.locationForm.get('state').setValue(e.item.subdivision || '');
    this.locationChanges.city_id = e.item.id || '';
    this.locationChanges.city.city = e.item.city || '';
  }


  cityFormatter = (result: any) => result.city;


  searchCity = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term , city) =>  this.getCities(term) )
  )


  /** Get Phones  */
  getPhones(phones:IPhone[]){
    this.locationChanges.phones = phones;
    
  }
  
  /** Get busniess hours */
  getBusinessHours(hours:IBuisnessHour[]){
    this.locationChanges.business_hours = hours;
    
  }

  getCities(term?:string){

    if(this.selectedCity === null && this.selectedCountry === null) return;


    let city = this.selectedCity !== null ? 
               this.selectedCity.city || this.selectedCity : '';


   if(city !== ''){

    return this.region
               .getCities(this.selectedCountry ,city)
               .pipe(
                 map(({data}) => data['getListOfCities']),
                 filter(cities => {
                   return cities.filter(c => c.city.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
                 })
                )
   }
  }


  submitForm() : boolean{
    this.submited = true;

      let form = this.locationForm;

        if(form.valid && this.locationChanges){ 
          let { name,
                street_address,
                apartment,
                zip_code,
                primary , state} = form.controls;

        /// Set values for added items ///
        this.locationChanges.name = name.value;
        this.locationChanges.street_address = street_address.value;
        this.locationChanges.apartment = apartment.value;
        this.locationChanges.zip_code = zip_code.value;
        this.locationChanges.primary = primary.value;
        this.locationChanges.state = state.value;
        this.locationChanges.country_id = this.selectedCountry;


        return true;

      }
      return false;
  }

}
