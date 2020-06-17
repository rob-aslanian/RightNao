import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdsCandidateService } from './ads-candidate.service';

@Component({
  selector: 'app-ads-candidate',
  templateUrl: './ads-candidate.component.html',
  styleUrls: ['./ads-candidate.component.scss']
})
export class AdsCandidateComponent implements OnInit {

  candidateForm:FormGroup;
  page:number = 1;

  constructor(
    private f:FormBuilder,
    private adsCandidateService:AdsCandidateService
  ) { 
    this.candidateForm = f.group({
      location:[''],
      currency:[''],
      start_date:['']
    })
  }

  ngOnInit() {
    
  }

  next(){
    let form = this.candidateForm.value;

    if(this.candidateForm.valid){
      this.adsCandidateService.adsCandidate = {
        ...form,
        location:[{
          country_id:form.location,
          city:{}
        }]
      }
      
      window.scroll({top:0 , behavior:'smooth'});
      this.page = 2;
    }
  }

  back(){
    window.scroll({top:0 , behavior:'smooth'});

    this.page = 1;
  }

}
