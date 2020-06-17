import { Component, OnInit } from '@angular/core';
import { companyType } from 'src/app/_shared/models/company';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-company-type-column',
  templateUrl: './search-company-type-column.component.html',
  styleUrls: ['./search-company-type-column.component.scss']
})
export class SearchCompanyTypeColumnComponent implements OnInit {

  companyKeys = Object.keys(companyType);
  cmpType = companyType;
  form:FormGroup;

  constructor() { 
    this.form = new FormGroup({});
  }

  ngOnInit() {
  }

}
