import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-show-candidates-column',
  templateUrl: './search-show-candidates-column.component.html',
  styleUrls: ['./search-show-candidates-column.component.scss']
})
export class SearchShowCandidatesColumnComponent implements OnInit {

  form:FormGroup;

  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

}
