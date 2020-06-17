import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-interest-column',
  templateUrl: './search-interest-column.component.html',
  styleUrls: ['./search-interest-column.component.scss']
})
export class SearchInterestColumnComponent implements OnInit {

  interests = [];
  form:FormGroup;
  
  constructor() { 
    this.form = new FormGroup({});
  }

  ngOnInit() {
  }

  checkInterest(e){
    const target = e.target;

    this.interests
        .map(el => {
          if(el.name === target.value) {
              el.isSelected = target.checked;
          }
    })

    this.setValues();
  }

  selectInterest(e){
    const item = e.target.value.trim();

    
  if(item !== ""){
    if(!this.interests.some(el => el.name === item)){ 
      this.interests.push({
        name:item,
        isSelected:true
      });

   }
  }

   this.setValues();

  }

  setValues(){
    this.form
        .get('interest')
        .patchValue(
          this.interests
              .filter(el => el.isSelected)
              .map(el => el.name)
        )
  }

}
