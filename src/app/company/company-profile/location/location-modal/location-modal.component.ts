import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ILocation } from 'src/app/_shared/models/company/location.interface';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { Observable } from 'rxjs';
import { RegionService } from 'src/app/_shared/region.service';
import { IPhone } from 'src/app/_shared/models/company/phone.interface';
import { IBuisnessHour } from 'src/app/_shared/models/businessHours.interface';
import { LocationService } from 'src/app/_shared/services/companies/location.service';
import { LocationFormComponent } from 'src/app/_shared/components/company/location-form/location-form.component';


@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']
})
export class LocationModalComponent implements OnInit {

  @ViewChild(LocationFormComponent, { static: true }) location:LocationFormComponent

  @Output() result:EventEmitter<ILocation> = new EventEmitter<ILocation>();
  
  @Input() companyId:string;
  @Input() data:ILocation;

  locationForm:FormGroup;
  countries:Observable<any>;
  cities: any[];


  selectedCountry:string = null;
  selectedCity:any = null;

  locationChanges: ILocation = {
    apartment:null,
    street_address:null,
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

  constructor(
    private f :FormBuilder,
    private region:RegionService,
    private locationService:LocationService
  ) {
    this.locationForm = f.group({
       name:[''],
       street_address:[''],
       apartament:[''],
       country_id:[''],
       city_id:[''],
       zip_code:['' , PasswordValidation.detectNumber()],
       is_primary:[false]

    })
   }

  ngOnInit() {
    if(this.data){
      console.log(this.data);
    }
    /// Get list of countries ///
    this.countries = this.region.Countries;
    this.patchData();
  }

  patchData(){

    if(this.data){
      let { 
        business_hours,country_id,
        city,geo_pos,id,phones
       } = this.data;


       this.locationChanges = this.data;

       /// Parse city and country ///
       if(city){
         this.selectedCity = city;
         this.locationForm.get('city_id').setValue(city.id);
       }
       this.selectedCountry = country_id;
      

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

              },(err) => {
                console.log(err);       
        });
  }




  /** Get Phones  */
  getPhones(phones:IPhone[]){
    this.locationChanges.phones = phones;
    
  }
  
  submit(another?:boolean){
  
      if(this.location.submitForm()){ 

        let location = this.location.locationChanges;
  
        /// Edit location ///
        if(location){
          if(this.data){
            this.locationService
                .editLocation(this.companyId , location)
                .subscribe((data) => {
                    this.result.emit({
                      ...location,
                      _close:true,
                      _type:'edit'
                    })
                }, 
                (err) => {
                    console.log(err);
                })
  
          }else{
            /// Add location /// 
            this.locationService
                .addLocation(this.companyId , location)
                .subscribe(({data}) => {
                    this.result.emit({
                      id:data.AddCompanyAddress.id,
                      ...location,
                      _close:!another || false,
                      _type:'add'
                    });
  
                    if(another) this.location.clearForm();
                }, 
                (err) => {
                    console.log(err);    
                });
          }   
        }   


      }
  }

}
