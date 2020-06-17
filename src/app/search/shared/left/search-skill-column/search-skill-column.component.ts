import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import skillsData from "src/assets/data/en/slillsExp";
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-skill-column',
  templateUrl: './search-skill-column.component.html',
  styleUrls: ['./search-skill-column.component.scss']
})
export class SearchSkillColumnComponent implements OnInit {

  skills = [];
  form:FormGroup;

  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

  checkSkill(e){
    const target = e.target;

    this.skills
        .map(el => {
          if(el.name === target.value) {
              el.isSelected = target.checked;
          }
    })

    this.setValues();
  }


  searchSkills = (text: Observable<string>) =>
    text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(val => val.length >= 2),
      map(skill =>
        skill === ""
          ? []
          : skillsData.filter(val =>
              val.toLowerCase().includes(skill.toLowerCase())
            ).slice(0 , 10)
      )
  );

  onSelectSkill(e:NgbTypeaheadSelectItemEvent) {
    const item  = e.item;

    if(!this.skills.some(el => el.name === item)){ 
      this.skills.push({
        name:item,
        isSelected:true
      });

   }

   this.setValues();

  }

  setValues(){
    this.form
        .get('skill')
        .patchValue(
          this.skills
              .filter(el => el.isSelected)
              .map(el => el.name)
        )
  }

}
