import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-job-title-column',
  templateUrl: './search-job-title-column.component.html',
  styleUrls: ['./search-job-title-column.component.scss']
})
export class SearchJobTitleColumnComponent implements OnInit {

  jobTitles = [];
  form:FormGroup;
  
  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

  checkedJobTitle(e){
    const target = e.target;

    this.jobTitles
        .map(el => {
          if(el.name === target.value) {
              el.isSelected = target.checked;
          }
    })

    this.setValues();
  }

  selectJobTitle(e){
    const item = e.target.value.trim();

    
  if(item !== ""){
    if(!this.jobTitles.some(el => el.name === item)){ 
      this.jobTitles.push({
        name:item,
        isSelected:true
      });

   }
  }

   this.setValues();

  }

  setValues(){
    this.form
        .get('position')
        .patchValue(
          this.jobTitles
              .filter(el => el.isSelected)
              .map(el => el.name)
        )
  }

}
