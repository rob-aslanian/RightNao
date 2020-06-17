import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JobTypes } from 'src/app/jobs/models/userJobs.model';

@Component({
  selector: 'app-search-job-type-column',
  templateUrl: './search-job-type-column.component.html',
  styleUrls: ['./search-job-type-column.component.scss']
})
export class SearchJobTypeColumnComponent implements OnInit {

  form:FormGroup;
  jobTypes = JobTypes;
  selected = [];

  constructor() {
    this.form = new FormGroup({});  
  }

  ngOnInit() {
  }

  jobTypeChange(e , idx:number){
    const item = e.target;

    this.jobTypes[idx]['isSelected'] = item.checked;

    this.form.get('job_type')
             .patchValue(
               this.jobTypes
                   .filter(el => el['isSelected'])
                   .map(el => el.id)
              )
  }

}
