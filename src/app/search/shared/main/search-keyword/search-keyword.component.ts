import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { SearchService } from 'src/app/search/search.service';
import { FilterRadioBtns } from 'src/app/search/models/search.model';
import { BeautifyPipe } from 'src/app/_shared/pipes/beautify.pipe';

@Component({
  selector: 'app-search-keyword',
  templateUrl: './search-keyword.component.html',
  styleUrls: ['./search-keyword.component.scss']
})
export class SearchKeywordComponent implements OnInit {

  @Input() keyword;


  @Output() result:EventEmitter<object> = new EventEmitter<object>();


  private __oldKeywords = [];

  alreadyExist:boolean = false;
  name:string;

  constructor(
    private searchService:SearchService
  ) { }

  ngOnInit() {

    this.checkIfExist();
    
    if(!this.alreadyExist){
      this.parseKeyword();
    }

  }

  parseKeyword(){
    let { name , value } = this.keyword;

    switch(value){
      case"country":{
        return this.name = utilities.getCountryName(name);
      }
      case"language":{
        return this.name = utilities.getLanguage(name);
      }
      case"industry":{
        return this.name = utilities.getInudsryName(name);
      }
      case"size":{
        if(this.name === 'size_unknown') {
          return delete this.name;
        }
        return this.name = utilities.getCompanySizeName(name);
      }
      case"company_size":{
        if(this.name === 'size_unknown') {
          return delete this.name;
        }
        return this.name = utilities.getCompanySizeName(name);
      }
      case"type":{
        if(this.name === 'type_unknown') {
          return delete this.name;
        }
        return this.name = utilities.getCompanyType(name);
      }
      case"experience_level" :{
        if(this.name === 'experience_unknown') {
          return delete this.name;
        }
        return this.name = utilities.getExerienceName(name);
      }
      
      default: return this.name = this.keyword.name;
    }
  }

  checkIfExist(){



    if(this.__oldKeywords.some(el => 
        el['name'] === this.keyword['name'] && 
        el['value'] === this.keyword['value'])
    ){
      this.alreadyExist = true;
    }else{ 
      this.__oldKeywords.push(this.keyword);
      this.alreadyExist = false;
    }
  
    
  }

  removeKeyword(){
    this.result.emit({
      id:this.keyword.id ? this.keyword.id : this.keyword.name,
      value:this.keyword.value,
    })
  }

  ngOnDestroy(): void {
    console.log(this.__oldKeywords);
    
  }

}
