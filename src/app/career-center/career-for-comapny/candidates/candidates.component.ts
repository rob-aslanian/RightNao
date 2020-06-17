import { Component, OnInit } from '@angular/core';
import { CareerCenterService } from '../../career-center.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  candidates:Observable<any>;
  companyID:string;

  constructor(
    private careerService:CareerCenterService,
  ) { }

  ngOnInit() {

   this.companyID  = this.careerService.companyID;
   this.candidates = this.careerService
                         .GetSavedCVs({
                            first:30,
                            after:"0",
                          })
  
  }

  // searchCandidate(e){

  //   if(e.which >= 65 && e.which <= 90 || e.which === 8){
  //     let value = e.target.value !== '' ? [e.target.value] : undefined;

 
  //     this.candidates = this.jobs
  //                           .getAllCandidate(value)
  //                           .pipe(
  //                             takeUntil(this.destroy$),
  //                             debounceTime(500),
  //                             map(({data}) => data['searchCandidate'])
  //                             )
  //   }


  // }

}
