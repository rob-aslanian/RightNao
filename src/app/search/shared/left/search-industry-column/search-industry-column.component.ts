import { Component, OnInit } from '@angular/core';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

import industriesData from 'src/assets/data/en/industries';

@Component({
  selector: 'app-search-industry-column',
  templateUrl: './search-industry-column.component.html',
  styleUrls: ['./search-industry-column.component.scss']
})
export class SearchIndustryColumnComponent implements OnInit {

  form:FormGroup;
  inudstries = [];
  industriesData = industriesData;

  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

  checkIndustry(e){
    const target = e.target;

    this.inudstries
        .map(el => {
          if(el.name === target.value) {
              el.isSelected = target.checked;
          }
        })
  
    this.setValues();
  }


  formatIndustry = (ind) => ind['name'];

  searchIndustry = (text$: Observable<string>) =>
    text$.pipe(
      distinctUntilChanged(),
      map(term => 
         term.length > 1 ? 
         industriesData
              .filter(ind => ind.name.toLowerCase().includes(term.toLowerCase())).slice(0 ,10) : ""

      ),

  )

  selectInudstry(e){
    const target = e.target,
          options = target.options,
          name = options[target.selectedIndex].value;
 

    if(!this.inudstries.some(el => el.name === name)){ 
      this.inudstries.push({
        name,
        isSelected:true
      });

   }

   this.setValues();
  }

  setValues(){
    this.form
        .get('industry')
        .patchValue(
          this.inudstries
              .filter(el => el.isSelected)
              .map(el => el.name)
        )
  }

}
