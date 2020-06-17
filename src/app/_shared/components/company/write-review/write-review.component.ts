import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {CompanyProfileService} from '../../../services/companies/company-profile.service';
import {ratingModel} from './Models/model';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})

export class WriteReviewComponent implements OnInit {

  @Input() companyId;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<object>();
  
  rating:number;
  reviewForm:FormGroup
  isValid:boolean = false;
  isValidText:boolean = false;
  
  constructor(
  private fb:FormBuilder,
  private companyservice:CompanyProfileService

  ) { 
       this.reviewForm = this.fb.group({
        ratingF:['',Validators.required],
        headline:['',Validators.required],
        text:['']
       })
  }

  ngOnInit() {
  }
 
  onSubmit(){
    if(!this.rating){
       this.isValid = true;
    }
    else if(this.reviewForm.controls.text.value.length > 0 &&  this.reviewForm.controls.headline.value.length < 1){
     this.isValidText = true;
    }
    else {
      let modal = ratingModel[this.rating];
      
      let input = {
       company_id:this.companyId,
       input:{
         score:modal,
         headline:this.reviewForm.controls.headline.value?this.reviewForm.controls.headline.value:"",
         description:this.reviewForm.controls.text.value?this.reviewForm.controls.text.value:""
       }  
     }
      this.companyservice.addCompanyReview(input).subscribe();
      this.closeModal.emit(true)
        }
    }

   }
 
