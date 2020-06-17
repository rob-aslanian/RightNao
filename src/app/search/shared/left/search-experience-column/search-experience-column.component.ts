import { Component, OnInit } from '@angular/core';
import { ExperienceYears } from 'src/app/jobs/models/userJobs.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-experience-column',
  templateUrl: './search-experience-column.component.html',
  styleUrls: ['./search-experience-column.component.scss']
})
export class SearchExperienceColumnComponent implements OnInit {

  experiences = ExperienceYears.filter(el => el.id !== 'without_experience');
  form:FormGroup;

  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

}
