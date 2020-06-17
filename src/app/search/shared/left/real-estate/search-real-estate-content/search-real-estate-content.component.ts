import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISearchRealEstateRequest } from 'src/app/search/models/search.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RealEstaetLeftInputModel, InputTypes } from 'src/app/search/models/real-estate.model';

@Component({
  selector: 'app-search-real-estate-content',
  templateUrl: './search-real-estate-content.component.html',
  styleUrls: ['./search-real-estate-content.component.scss']
})
export class SearchRealEstateContentComponent implements OnInit , OnDestroy {

  destroy$:Subject<any> = new Subject<any>();

  form:FormGroup;

  dealType:string;
  propertyType:string;
  test = RealEstaetLeftInputModel

  constructor(
    private f:FormBuilder
  ) {
    this.form  = f.group({});
   }

  ngOnInit() {
    this.form
        .valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:ISearchRealEstateRequest) => {
           const {  deal_type , property_type } = data;
           this.dealType = deal_type;
           this.propertyType = property_type;

           console.log(this.test);
           
        })
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}
