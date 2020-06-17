import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import * as _compponents  from './index'
import { SearchLeftColumns, SearchByType, SearchForms, FilterIgnoreField, FilterRadioBtns } from '../../models/search.model';
import { SearchService } from '../../search.service';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit , OnDestroy {

  destroy$:Subject<any> = new Subject<any>();

  @ViewChild('container' , { static:true ,  read:ViewContainerRef }) container:ViewContainerRef;

  type:SearchByType;
  leftColumns = SearchLeftColumns;
  form:FormGroup;
  
  constructor(
    private resolver:ComponentFactoryResolver,
    public searchService:SearchService,
  ) { 
    if(searchService.type){
      this.type = searchService.type;
    }

    this.searchService.searchForm.next(new SearchForms(this.type).generateForm());

  }

  ngOnInit() {
    
    this.dynamicInjectComponents();


    this.submit();
  }


  dynamicInjectComponents(){
    const columns = SearchLeftColumns[this.type];

    columns.map(column => {
      const comp = this.resolver.resolveComponentFactory(_compponents[column]);
      const el:any = this.container.createComponent(comp);
      
      if (el.instance.form) {
         el.instance.form = this.searchService.searchForm.value;
      }

    })
  }

  submit(){
    this.searchService
        .searchForm.value
        .valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => this.parseData(data))
    
    this.parseFillters();
  }

  parseFillters(){
    const filters = history.state.filter;

    if(filters){
      this.searchService
          .searchForm.value
          .patchValue(filters);  

      this.parseData(filters);
    } 
  }

  parseData(data){

    const valuesKey = Object.keys(data),
          searchCondition = this.searchService.searchCondition,
          fillterKeywords = this.searchService.fillterKeywords;

      valuesKey.map(key => {

        // Parse working hours --> week days 
        if (key === "week_days"){
          if(data[key] ) {
            if (data[key].length > 0) {
             data[key] = data[key].map(el => el['item_id']);
            }  
          }
        }
        
        if(  data[key] === null) 
          { delete data[key] }
        else{
          this.parseKeyword(data[key] , key);
        }

      })

      
      searchCondition.next({ 
            ...searchCondition.getValue(),
            ...data,
      });

      fillterKeywords.next(this.searchService.fillterKeywords.value)
  }


  parseKeyword(name:any , key:string){
    const fillterKeywords = this.searchService.fillterKeywords.value;


    if(Array.isArray(name)) {
       return name.map(el => this.parseKeyword(el , key))
    }
    /// Ignored fields ///
    if(!FilterIgnoreField.includes(key)){
      /// Not Empty string ///
      if(name !== ""){
        /// Not Boolean ///
        if(typeof name  !== 'boolean'){
            if(name.length > 0 || name !== 0){
              /// If not exist /// 
              if(!fillterKeywords.some(el => el.name === name && el.value === key)){
                  fillterKeywords.push({
                    name,
                    value:key
                  }); 
              }

            }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }

}
