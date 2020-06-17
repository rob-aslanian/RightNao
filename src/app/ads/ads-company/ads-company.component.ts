import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ads-company',
  templateUrl: './ads-company.component.html',
  styleUrls: ['./ads-company.component.scss']
})
export class AdsCompanyComponent implements OnInit {


  jobsForm:FormGroup;
  page:number = 1;

  constructor(
    private f:FormBuilder
  ) { 
    this.jobsForm = f.group({
      location:[''],
      currency:[''],
      start_date:['']
    })
  }
  

  ngOnInit() {
  }

 
  next(){
    if(this.jobsForm.valid){
      window.scroll({top:0 , behavior:'smooth'});
      this.page = 2;
    }
  }

  back(){
    window.scroll({top:0 , behavior:'smooth'});
    this.page = 1;
  }

}
