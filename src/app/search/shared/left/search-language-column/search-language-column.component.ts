import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/_shared/region.service';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-language-column',
  templateUrl: './search-language-column.component.html',
  styleUrls: ['./search-language-column.component.scss']
})
export class SearchLanguageColumnComponent implements OnInit {

  form:FormGroup;
  languages = [];
  allLangs:any;

  constructor(
    private region:RegionService,
  ) {
    this.form = new FormGroup({});
    this.allLangs = this.region.getListOfLanguages();
  }

  ngOnInit() {
  }

  checkeLanguage(e){
    const target = e.target;

    this.languages
        .map(el => {
          if(el.name === target.value) {
              el.isSelected = target.checked;
          }
        })
  
    this.setValues();
  }


  formatLanguage = (lang) => lang["item_text"];

  searchLanugage = (text$: Observable<string>) =>
    text$.pipe(
      distinctUntilChanged(),
      map(term => 
         term.length > 1 ? 
         this.allLangs
              .filter(lang => lang['item_text'].toLowerCase().includes(term.toLowerCase())).slice(0 ,10) : ""

      ),

  )

  selectLanguage(e:NgbTypeaheadSelectItemEvent){
    const item = e.item;

    if(!this.languages.includes(item.item_text)){ 
      this.languages.push({
        id:item.item_id,
        name:item.item_text,
        isSelected:true
      });

   }

   this.setValues();
  }

  setValues(){
    this.form
        .get('language')
        .patchValue(
          this.languages
              .filter(el => el.isSelected)
              .map(el => el.id)
        )
  }


    
  

}
