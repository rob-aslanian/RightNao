 
import { EstateFormService } from '../Service/estate-form.service';
import { RegionService } from 'src/app/_shared/region.service';
import { dealType } from '../../Shared/models/estate-model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable  } from 'rxjs';
import { debounceTime, distinctUntilChanged,  map, filter, switchMap } from 'rxjs/operators';
import { deal_type, select_materials, move_location, select_services, timing } from '../../Shared/models/estate-model';
import { Router } from '@angular/router';
import { ServiceSliderComponent } from 'src/app/_shared/components/service-slider/service-slider.component';
import { RealEstateService } from '../Service/real-estate.service';
 

@Component({
  selector: 'app-deal-type',
  templateUrl: './deal-type.component.html',
  styleUrls: ['./deal-type.component.scss'],
}) 

export class DealTypeComponent implements OnInit, OnDestroy {

  @ViewChild( ServiceSliderComponent, { static: false } ) _slider: ServiceSliderComponent;

  form: FormGroup;
  listOfLanguages: Observable<any[]>;
  selectedCountry: string;
  dealType = dealType;
  dealsType: any[] = [];
  deal_type = deal_type;
  deal_type_keys = Object.keys(deal_type);
  select_materials = select_materials;
  timing = timing;
  countries: any[] = [];
  buildForm: FormGroup;                   
  deal_type_renovation: FormGroup;
  dropdownSettingsSubIndustry = null; 
  move_location = move_location;
  select_services = select_services;
  files: any[] = [];
  submitted: boolean = false; 
  exterior: FormGroup;
  interior: FormGroup;
  interior_exterior: FormGroup;
 
  constructor(
    private formService: EstateFormService,
    private regionService: RegionService,
    private router: Router,
    private estateService: RealEstateService
  ) {
   
      formService.yleDato.next(formService.dealType);
      this.listOfLanguages = regionService.getListOfCountries();

      this.files = formService.files.getValue();
    
      this.exterior = formService.exterior;
      this.interior = formService.interior;
      this.interior_exterior  = formService.interior_exterior;
      this.deal_type_renovation = formService.deal_type_renovation;
      this.buildForm = formService.buildForm;
   };

  ngOnInit() {
       
    this.dropdownSettingsSubIndustry =  {
        singleSelection: false,
        idField:           'asc',
        textField:         'name',
        selectAllText:     'Select All',
        unSelectAllText:   'UnSelect All',
        itemsShowLimit:    3,
        allowSearchFilter: true,
    };

    this.form = this.formService.yleDato.getValue();
    
    this.dealsType = this.dealType['DealType_Rent']; 
 
    this.form
        .get('location')
        .get('country_id').valueChanges.subscribe( countryId => this.selectedCountry = countryId );

    this.form.get('deal_type')
        .valueChanges.subscribe( type => this.dealsType = this.dealType[type] );

  }
  
  cityFormatter = (result: any) => result.city;    

  searchCity = (text$: Observable<string>) =>    
      text$.pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((term ) =>  term.length > 2 ? this.getCities(term): [])
      )


  getCities(term?:string){ 

    let city =  term;
    
    if(city !== '' && term !== ''){

        return this.regionService
                  .getCities(this.selectedCountry ,city)
                  .pipe(
                    map(({data}) => data['getListOfCities']),
                      filter(cities => {
                          return cities.filter(c => c.city.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
                      })
                    )
      }
    }

  getFiles( e: any ) {
    this.formService.files.next(e.slider);
  };

  navigate( dealType: string, subCatId: string  ) {
    
    this.submitted = true;
    this.formService
        .sumbitted.next(true);

    if(this._slider.checkHasError()) return;

    // Validation inline form
    if( dealType === 'DealType_Move' || dealType === 'DealType_Renovation' || 
        dealType === 'DealType_Materials' || dealType === 'DealType_Build' ) {
             if( this.validateForm( dealType ) )  return window.scrollTo({ behavior: 'smooth', top: 0 });
             this.submitForm( dealType );          
             this.router.navigate(['/real-estate', 'add-estate', 'payment']);
    } else {
    // Validation for navigated form
      if( this.form.invalid ) return window.scrollTo({ behavior: 'smooth', top: 0 }) ;
          this.submitForm( 'default-form' );        
          this.router.navigate(['/real-estate', 'add-estate', 'add', dealType, subCatId]);
    }
    window.scrollTo({ behavior: 'smooth', top: 0 });
    this.estateService.step.next('next');
    
  }

  getCurrency( e: any ) {    
      let form: FormGroup;
      if( e._case === 'exterior' ) {  
          form = this.exterior;
      } else if( e._case === 'interior_exterior' ) {
          form = this.interior_exterior;
      } else {
        form = this.interior;
      }
      form.get('currency')
          .setValue(e.value);
  }

  validateForm( fieldType: string ): boolean {   
    switch (fieldType) {
      case 'DealType_Build':              
            if( this.deal_type_renovation.invalid || 
                this.form.get('location').invalid ||
                this.buildForm.invalid  ) return true;
               return false;
          
      case 'DealType_Materials':
            if( this.deal_type_renovation.invalid ) return true;
              return false;
      case 'DealType_Renovation':
            if( this.exterior.invalid || 
                this.interior.invalid ||
                this.interior_exterior.invalid ||
                this.deal_type_renovation.invalid ) return true;
              return false;
      case 'DealType_Move':
          if( this.deal_type_renovation.invalid ) return true;
             return false;            
      default:
        return true;
    }
 
  };

  submitForm( fieldType: string  ) {
  
    const rental_detail = [{
          description:  this.formService.deal_type_renovation.get('description').value,
          title: this.formService.deal_type_renovation.get('title').value,
          house_rules: ''
    }];

  
    switch (fieldType) {
          case 'DealType_Build':            
                  return this.formService
                            .formInput.next({
                                 rental_info: {
                                    deal_type: 'DealType_Build',
                                    property_type: 'PropertyType_Any',
                                    location: {
                                     city: {
                                       city: this.form.get('location').get('city').value.city
                                     },
                                     country_id: this.form.get('location').get('country_id').value
                                    },
                                    expired_days: 0, 
                                    post_currency: this.formService.totalArea.get('metrict_type').value
                                 },
                                 total_area: this.formService.totalArea.get('total_area').value,
                                 rental_detail:  rental_detail,
                                 is_agent: false,
                                 status: 'Status_Any',
                                 has_repossesed: false,
                                 timing: this.formService.buildForm.get('timing').value
                            });
              
          case 'DealType_Materials':
              return  this.formService
                          .formInput.next({
                              rental_info: {
                                deal_type: 'DealType_Materials',
                                property_type: 'PropertyType_Any',
                                expired_days: 0,
                                post_currency: '',
                                location: {
                                  city: {
                                    city: ''
                                  },
                                  country_id: ''
                                 },
                              },
                              materials: this.select_materials.filter( location => location.checked ).map(( location ) => location.id ),
                              rental_detail: rental_detail,
                              is_agent: false,
                              status: 'Status_Any',
                              has_repossesed: false
                        })  

          case 'DealType_Renovation':
            return this.formService
                        .formInput.next({
                            rental_info: {
                                deal_type: 'DealType_Renovation',
                                property_type: 'PropertyType_Any',
                                location: {
                                city: {
                                  city: this.form.get('location').get('city').value.city
                                },
                                country_id: this.form.get('location').get('country_id').value
                                },
                                expired_days: 0,
                                post_currency: ''
                            },
                            rental_detail: rental_detail,
                            status: 'Status_Any',
                            has_repossesed: false,
                            is_agent: false,
                            exterior: this.formService.exterior.value,
                            interior: this.formService.interior.value,
                            interior_and_exterior: this.formService.interior_exterior.value,
                            country_ids: [this.form.get('location').get('country_id').value],
                            city_ids: [ this.form.get('location').get('city').value.city]
                          });
                                
          case 'DealType_Move':
              return  this.formService
                    .formInput.next({
                      location_type: this.move_location.filter( location => location.checked ).map(( location ) => location.id ),
                      services: this.select_services.filter( service => service.checked ).map(( service ) => service.id ),
                      rental_detail: rental_detail,
                      has_repossesed: false,
                      is_agent: false,
                      status: "Status_Any",
                      rental_info: {
                        deal_type: 'DealType_Move',
                        expired_days: 0,
                        post_currency: '' ,
                        property_type: 'PropertyType_Any',
                        location:{
                          city: {
                              city: ''
                          },
                          country_id: ''
                        }
                      },
                      country_ids: this.countries
                }) 
          case 'default-form': 
              this.formService.dealTypeInput.next( this.form.value );
              return 'defaul-form';       
          default:
            return true;
        }
  }


  onItemSelect( e: any, isAll: boolean ) {
          isAll ? this.countries = e : this.countries.push(e);
  };

  onDeselect( e: any ) {
           this.countries = this.countries.filter( ( country ) => country.asc !== e.asc );
  };

  ngOnDestroy(): void {
       this.formService
           .sumbitted.next(false);
  };


}
