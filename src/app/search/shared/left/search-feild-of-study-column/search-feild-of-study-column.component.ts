import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, filter } from 'rxjs/operators';
import fieldOfStudy from 'src/assets/data/en/fieldOfStudy';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-feild-of-study-column',
  templateUrl: './search-feild-of-study-column.component.html',
  styleUrls: ['./search-feild-of-study-column.component.scss']
})
export class SearchFeildOfStudyColumnComponent implements OnInit {

  fieldOfStudies = [];
  form:FormGroup;

  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
   
  }

  checkFieldOfStudy(e){
    const target = e.target;

    this.fieldOfStudies
        .map(el => {
          if(el.name === target.value) {
              el.isSelected = target.checked;
          }
    })

    this.setValues();
  }

  searchFieldOfStudy = (text: Observable<string>) =>
    text.pipe(
      distinctUntilChanged(),
      filter(val => val.length >= 2),
      map(study =>
        study === ""
          ? []
          : fieldOfStudy.filter(val =>
              val.toLowerCase().includes(study.toLowerCase())
            ).slice(0 , 10)
      )
  );

  selectFieldOfStudy(e:NgbTypeaheadSelectItemEvent){
    const item = e.item;

    if(!this.fieldOfStudies.some(el => el.name === item)){ 
      this.fieldOfStudies.push({
        name:item,
        isSelected:true
      });

   }

   this.setValues();

  }

  setValues(){
    this.form
        .get('filedOfStudy')
        .patchValue(
          this.fieldOfStudies
              .filter(el => el.isSelected)
              .map(el => el.name)
        )
  }
  

}
