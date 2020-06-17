import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICompanyEmail } from '../models/companyEmail.interface';
import { FormControl } from '@angular/forms';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { CompanyAccountService } from 'src/app/_shared/services/companies/company-account.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-company-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  @Input() data:ICompanyEmail[];
  @Input() id:string;

  @Output() result:EventEmitter<string> = new EventEmitter<string>();

  destroy$:Subject<any> = new Subject<any>();

  isOpenForm:boolean = false;
  isOpenEditForm:{
    [id:number]:boolean
  } = { }

  addEmail:FormControl;
  editEmail:ICompanyEmail;


  constructor(
    private companyService:CompanyAccountService
  ) {
     this.addEmail = new FormControl('' , PasswordValidation.detectEmail());
   }

  ngOnInit() {
  }


  toggle(type?:string , index?:number , content?:ICompanyEmail) {


    if(type === 'add'){
      this.isOpenForm = !this.isOpenForm;
      this.isOpenEditForm = {};

      this.addEmail.reset();

    }else{
      this.isOpenEditForm[index] = !this.isOpenEditForm[index];

      Object.keys(this.isOpenEditForm)
            .map(key => +key != index ? delete this.isOpenEditForm[key] : null) /// Clear previos 

      this.isOpenForm = false;
      this.editEmail = content;
    }

    this.result.emit('email')


  }

  submit(){
    let email = this.addEmail;

    if(email.valid && this.id){
          this.companyService
              .addEmail(this.id, email.value)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                ({ data }) => {
                  let id = data['AddCompanyEmail'].id;
                  
                  this.data.unshift({
                    id,
                    email:email.value
                  });

                  this.isOpenForm = false;                  
                },
                (err) => {
                  console.log(err);
                }
              )
    }
  }

  remove(){
    let id = this.editEmail['id'];

    if(id){
      this.companyService
          .deleteEmail(this.id , id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            ({ data }) => {
              let indexOfEmail = this.data.findIndex(el => el.id === id);

              indexOfEmail > -1 ? this.data.splice(indexOfEmail , 1) : null; /// Remove from html

              this.isOpenEditForm = {};
            },
            (err) => {
              console.log(err); 
            }
          )
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
  }

}
