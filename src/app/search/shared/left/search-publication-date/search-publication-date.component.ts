import { Component, OnInit } from '@angular/core';
import { PULICATION_DATE } from 'src/app/search/models/search.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-publication-date',
  templateUrl: './search-publication-date.component.html',
  styleUrls: ['./search-publication-date.component.scss']
})
export class SearchPublicationDateComponent implements OnInit {

  formName:string = "publication_date";
  form:FormGroup;

  publicationDates = PULICATION_DATE;

  constructor(
    private f:FormBuilder
  ) {
    this.form  = f.group({});
   }


  ngOnInit() {
  }

}
