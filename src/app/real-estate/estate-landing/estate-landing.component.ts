import { Component, OnInit } from '@angular/core';
import { RealEstateService } from '../add-estate/Service/real-estate.service';
import { ActivatedRoute } from '@angular/router';
import { estateEnum, propertyTypes } from '../Shared/models/estate.interface';
import { combineLatest } from 'rxjs';
import { switchMap, map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-estate-landing',
  templateUrl: './estate-landing.component.html',
  styleUrls: ['./estate-landing.component.scss']
})
export class EstateLandingComponent implements OnInit {

  homies: any[] = [];
  isLoading: boolean = true;
  propertyType: string = 'PropertyType_Any';
  
  constructor(
    private estateService: RealEstateService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    combineLatest(
        this.activatedRoute.params.pipe( map( ({ id }) =>  id ) ),
        this.activatedRoute.queryParams.pipe( map(({ propertyId }) => propertyId) )
    ).pipe(
        debounceTime(0),
        switchMap( ([ id, property ]) =>  this.fetchData(  id , property ) ),
    ).subscribe( data =>  { this.homies =  data['estates']; this.isLoading = false } );
         
  }
 
  fetchData( id: any  , property: ( string | undefined )  ) {
    this.propertyType = property ?  property :  this.propertyType;

    this.isLoading  = true;
    return   this.estateService
                 .GetRealEstates( id, {
                      first: 10,
                      after: '0'
                 }, this.propertyType )
  }

}
