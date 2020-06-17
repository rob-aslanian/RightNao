import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PROJECT_TYPE } from 'src/app/search/models/search.model';

@Component({
  selector: 'app-search-project-type',
  templateUrl: './search-project-type.component.html',
  styleUrls: ['./search-project-type.component.scss']
})
export class SearchProjectTypeComponent implements OnInit {

  form:FormGroup;
  projectTypes = PROJECT_TYPE;
  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

  selectProjectType(e){
    const target = e.target;

    this.projectTypes
        .map(el => {
          if(el.id === target.value) {
              el.isSelected = target.checked;
          }
        })
    

    this.setFormValue();
  }

  setFormValue(){

    this.form.get('project_type').patchValue(
          this.projectTypes
                      .filter(el => el.isSelected)
                      .map(el => el['id'])
      )
  }



}
