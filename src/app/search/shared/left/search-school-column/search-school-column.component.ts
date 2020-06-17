import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-school-column',
  templateUrl: './search-school-column.component.html',
  styleUrls: ['./search-school-column.component.scss']
})
export class SearchSchoolColumnComponent implements OnInit {


  schools = [];
  form:FormGroup;

  constructor() { 
    this.form = new FormGroup({});
  }

  ngOnInit() {
  }

  checkSchool(e){
    const target = e.target;

    this.schools
        .map(el => {
          if(el.name === target.value) {
              el.isSelected = target.checked;
          }
    })

    this.setValues();
  }

  selectSchool(e){
     const item = e.target.value.trim();

      
      if(item !== ""){
        if(!this.schools.some(el => el.name === item)){ 
          this.schools.push({
            name:item,
            isSelected:true
          });

      }
      }

    this.setValues();

  }

  setValues(){
    this.form
        .get('school')
        .patchValue(
          this.schools
              .filter(el => el.isSelected)
              .map(el => el.name)
        )
  }


}
