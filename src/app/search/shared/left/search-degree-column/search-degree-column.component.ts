import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import degressData from "src/assets/data/en/degries";
import { DefaultDegrees } from 'src/app/_shared/models/shared/shared.models';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-degree-column',
  templateUrl: './search-degree-column.component.html',
  styleUrls: ['./search-degree-column.component.scss']
})
export class SearchDegreeColumnComponent implements OnInit {

  degress = DefaultDegrees;
  form:FormGroup;

  constructor() { 
    this.form = new FormGroup({});
  }

  ngOnInit() {
  }

  
  checkDegree(e){
    const target = e.target;

    this.degress
        .map(el => {
          if(el.name === target.value) {
              el.isSelected = target.checked;
          }
        })
  
    this.setValues();
  }

  selectDegree(e:NgbTypeaheadSelectItemEvent){
    const item = e.item;

    console.log(e.item);
    
    if(!this.degress.includes(item.id)){ 
      this.degress.push({
        name:item,
        isSelected:true
      });

   }

   this.setValues();
  }


  searchDegree = (text: Observable<string>) =>
    text.pipe(
      distinctUntilChanged(),
      filter(val => val.length >= 2),
      map(degree =>
        degree === ""
          ? degressData
          : degressData.filter(val =>
              !this.degress.some(el => el.name === val) &&
              val.toLowerCase().includes(degree.toLowerCase()) 
            )
      )
    );

  setValues(){
      this.form
          .get('degree')
          .patchValue(
            this.degress
                .filter(el => el.isSelected)
                .map(el => el.name)
          )
  }

}
