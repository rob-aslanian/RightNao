import { Component, OnInit, Input } from '@angular/core';
import { Observable  } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { RegionService } from 'src/app/_shared/region.service';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

 @Input() location: FormGroup;

 @Input() set sumbitted( bool: boolean ) {
          this.isSubmitted = bool;
 };
 


 countryId: string;
 isSubmitted: boolean = false;
 country: string ;


  constructor(
       private region: RegionService,
  ) { }

  get locCtrs() {
       return this.location.controls;
  }
  

  ngOnInit() {
  
       this.location
        .get('isRemote')
         .valueChanges
         .pipe( distinctUntilChanged() )
          .subscribe( val => {
      
              if( val === 'On_Site_Work' ) {
                   // Set Validators  //
                   for( const key in this.location.controls ) {
                        if( key !== 'Remote_only' ) {
                           this.location.get(key).setValidators([Validators.required]);
                           this.location.get(key).updateValueAndValidity();
                        }
                   }
              } else if( val === 'Remote_only' ) {
                  // Remove Validators //
                    for( const key in this.location.controls ) {
                          if( key !== 'isRemote' ) {
                            this.location.get(key).clearValidators();
                            this.location.get(key).updateValueAndValidity();
                        }
                    }   
              }
          })
         
  }

 


   searchCountry = (text$: Observable<string>) =>    
      text$.pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap( (text) => {
                return text.length > 1 ?
                            this.region.Countries
                                  .pipe( 
                                      map( ( country : any ) =>   {
                                          return country
                                            .filter( country => country.name.toLowerCase().startsWith(text.toLocaleLowerCase()) )
      
                                          }
                                      )
                                  ) : []
          }              
      )     
    ) 
   searchCity = ($text: Observable<any>)  => 
        $text.pipe(
          debounceTime(100),
          distinctUntilChanged(),
          switchMap( text =>  this.region.getCities(this.countryId, text)  ),
          map( ({ data }) => data['getListOfCities'] )
      )
     
    //Formattes
    countryFormatter = (result: any) => result.name;    
    cityFormatter = (result: any) => result.city;    
    
    selectCountry( e: any ): void {
         this.countryId = e.item.asc;
         this.location.get('city').reset();
         this.location.get('city').enable();
    }
  
  
}
