import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { RegionService } from 'src/app/_shared/region.service';
import { Observable, Subject, merge } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { categories, languageEnum } from './utils/utils';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-open-v-office',
  templateUrl: './open-v-office.component.html',
  styleUrls: ['./open-v-office.component.scss']
})

export class OpenVOfficeComponent implements OnInit, OnDestroy {

  officeForm: FormGroup;
  $countries: Observable<any>;
  $destroy: Subject<any> = new Subject<any>();
  selectedCountry: string ;
  isSubmited: boolean = false;
  categories = categories;
  activeProfile: string ;
  listOfLanguages: any[] = [];
  addedLanguages: any[] = [];
  userId: string;
  languageEnum = languageEnum;
  isEdit: boolean = false;
  officeId: string;
  deletedLanguages: string[] = [];
  editedLanguages: any[] = [];
 

  constructor(
        private fb:FormBuilder,
        private officeService: OfficeService,
        private region: RegionService,
        private storage: GlobalUserProService,
        private route: Router,
        private activatedRoute: ActivatedRoute
  ) {
        this.officeForm = this.fb.group({

              name:['', Validators.required],
              mainCategory:['', Validators.required],
              city: ['', Validators.required],
              country: ['', Validators.required],
              description: ['']
        })

   }


    ngOnInit() {

        this.activeProfile = this.storage.isCompanyActive() ? 'company' : 'user';
        //GET countries

        this.isEdit = this.activatedRoute.snapshot.data['type'] &&  this.activatedRoute.snapshot.data['type'] === 'edit' ? true: false;

        // Edit office
        if( this.isEdit ) {
             this.officeId  = this.activatedRoute.snapshot.params['id'];

             this.officeService
             .getVOffice( this.officeId, this.storage.isCompanyActive() ? this.storage.getComapnyId() : undefined ).pipe(
                map( ({ data }) => data['GetVOfficeByID'] )
             ).subscribe( data =>  this.editOffice( data )  )
        }

        this.userId = !this.storage.isCompanyActive() && this.storage.getUserProfile()['id'];
        
        this.$countries = this.region.Countries
         .pipe( 
           takeUntil(this.$destroy))

        //Enable City on Country Change 

          this.officeForm.get('country')
          .valueChanges
            .subscribe( _ => {
                  this.officeForm.get('city').enable();
            } )
        

           this.listOfLanguages =  this.region.getListOfLanguages();
            
      
       }

   
    //Get Form Controls
    get offCtrs() {
      return this.officeForm.controls;
    }


     /// Search City ///
    cityFormatter = (result: any) => result.city;    

    //Search Languages
    languageFormatter = (result: any) => result.item_text;    

    searchCity = (text$: Observable<string>) =>    
      text$.pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((term ) =>  term.length > 2? this.getCities(term):[])
      )
 

     searchLanguage= (text$: Observable<string>) =>    
      text$.pipe(
        debounceTime(100),
        distinctUntilChanged(),
        map( input => input.length > 1 ? 
                      this.listOfLanguages.filter( lang => lang.item_text.toLowerCase().startsWith(input.toLowerCase()) ) : []  )
      )

      getCities(term?:string){
 
   
        this.selectedCountry = this.officeForm.get('country').value;   
        let city =  term;
    
       if(city !== '' && term !== ''){
    
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
      
    onSubmit(){
      this.isSubmited = true;
      if( !this.officeForm.valid ) {
         return;
      }

 
        const {  country, city, description, mainCategory, name } = this.officeForm.value;

        const input = {
            location: {
              country_id: country,
              city
            },
            description,
            category: mainCategory,
            name,
            languages: this.isEdit ?  this.addedLanguages.filter( item => !item.id ) : this.addedLanguages
        };
        
      // Case Edit
      if( this.isEdit ) {
         this.editedLanguages = this.addedLanguages.filter( lang => lang.id );
         
         return this.officeService
                .changeVOffice( this.officeId, input).pipe(
                    switchMap( ( id: string ) => this.editLanguages( ) )
                ).subscribe( () => this.navigateToOpennedOficce(this.officeId) );
  
      }

      
        this.officeService.openOffice( input )
            .pipe( takeUntil(this.$destroy) )
            .subscribe(  ({ data })   => {
                     const id: string = data['CreateVOffice']['id']
                     this.navigateToOpennedOficce(id); 
            })
      
    }

    getLanguage(  item: NgbTypeaheadSelectItemEvent , input ) {
         item.preventDefault();
         this.addedLanguages.push({ language: item.item.item_text, rank: 'Level_Begginer' });
         input.value = '';
    };

    removeLanguage( i: number ) {
        if( this.addedLanguages[i]['id']  ) {
              this.deletedLanguages.push( this.addedLanguages[i]['id']  )       
        }
        this.addedLanguages.splice( 0, 1 );
    }

    importLanguages() {
 
       this.officeService
       .importLanguages( this.userId ).pipe(
          takeUntil(this.$destroy),
          map( ({ data }) => data['getProfileByID']['languages'] )
       ).subscribe( (languages: any[] ) => {
         
             languages.map( lang => {
                  this.addedLanguages.push({
                       language: this.listOfLanguages.filter( langs => langs.item_id === lang.language )[0]['item_text'],
                       rank:     this.languageEnum[lang.rate.toString()]
                  })

             } )

        } )
    }

    navigateToOpennedOficce( id: string ) {
        const activeProfile = this.storage.isCompanyActive() ? 'company' : 'user';
        return  this.route.navigate([ 'v-office', 'office', id, activeProfile , this.storage.getProfileId() ] )
    }

    editOffice( office: any ) {
 
       // Office form 
       this.officeForm.patchValue({
              name: office.name,
              mainCategory: office.category,
              city: office.location.city,
              country: office.location.country.country,
              description: office.description
       })
       // Parse language 
       this.addedLanguages = office.languages;
       // Parse city
 
    };

    editLanguages(): Observable<any> {
       return   merge(
                  this.officeService.changeVOfficeLanguages( this.officeId , this.editedLanguages),
                  this.officeService.removeVOfficeLanguages( this.officeId, this.deletedLanguages ));
    }


    ngOnDestroy() {
        this.$destroy.next();
        this.$destroy.complete();
    }
}
