import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyAccountService } from 'src/app/_shared/services/companies/company-account.service';
import { PasswordValidation } from 'src/app/_shared/register.validator';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {
  
  @Input() companyName:string;
  @Input() comapnyId:string;

  @Output() result:EventEmitter<string> = new EventEmitter<string>();

  nameForm:FormGroup;
  submited:boolean = false;
  isEdit:boolean = false;


  constructor(
    private f:FormBuilder,
    private companyService:CompanyAccountService
  ) {
      this.nameForm = this.f.group({
        name: ["",Validators.compose([ Validators.required , PasswordValidation.detectOnlySpaces()])]
      });
  }

  ngOnInit() {
    if(this.companyName){
      this.nameForm.get('name')
          .setValue(this.companyName);
    }
  }


}
