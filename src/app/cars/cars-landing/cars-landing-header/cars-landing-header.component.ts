import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarsBrands } from '../../models/brands.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cars-landing-header',
  templateUrl: './cars-landing-header.component.html',
  styleUrls: ['./cars-landing-header.component.scss']
})
export class CarsLandingHeaderComponent implements OnInit {
  brandList;
  isMoreActive:boolean = false;

  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      map( ({ id }) => id )
    )
    .subscribe( data => this.brandList = CarsBrands[data] )
    
    
  }

}
