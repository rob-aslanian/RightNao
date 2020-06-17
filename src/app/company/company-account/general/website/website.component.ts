import { Component, OnInit, Input, TemplateRef, EventEmitter, Output } from '@angular/core';
import { ICompanyWebsite, IWebsite } from '../models/companyWebsite.interface';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { FormControl } from '@angular/forms';
import { CompanyAccountService } from 'src/app/_shared/services/companies/company-account.service';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit {

  @Input() data:ICompanyWebsite;

  @Output() result:EventEmitter<string> = new EventEmitter<string>();

  isOpenEditForm: {
    [id:number]:boolean
  } = {};

  isOpenForm: boolean;
  editableContent:IWebsite;
  websiteControl: FormControl;
  scrollTo: TemplateRef<any>;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private companyService:CompanyAccountService
  ) { 
    this.websiteControl = new FormControl('' , PasswordValidation.detectURL()); /// Add 
  }

  ngOnInit() {
  }

  toggle(type?:string , index?:number , content?:IWebsite) {


    if(type === 'add'){
      this.isOpenForm = !this.isOpenForm;
      this.isOpenEditForm = {};
      this.websiteControl.reset();
    }else{

      this.isOpenEditForm[index] = !this.isOpenEditForm[index];
      Object.keys(this.isOpenEditForm)
            .map(key => +key != index ? delete this.isOpenEditForm[key] : null) /// Clear previos 

      this.isOpenForm = false;
      this.editableContent = content;
      this.websiteControl.setValue(content.website); /// Patch data 
    }

     this.result.emit('website');

  }

  
  submit(type:string){
    
   let website = this.websiteControl;
    
    if(website.valid){
      /// Add website ///
      if(type === 'add'){
        this.companyService
            .addWebsite(this.data.company_id , website.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              ({ data }) => {
                let id = data['AddCompanyWebsite'].id;
                this.data.websites.unshift({
                  id,
                  website:website.value
                });

                this.isOpenForm = false;
              },
              (err) => {
                console.log(err);
              }
            )
      }
      /// Edit website ///
      else{
        this.editableContent.website = this.websiteControl.value;

        this.companyService
            .changeWebsite(this.data.company_id, this.editableContent)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              ({ data }) => {
                this.isOpenEditForm = {};
              },
              (err) => console.log(err)
              
            )
      }

    }
  }

  remove(){
     if(this.editableContent){
        this.companyService
            .deleteWebsite(this.data.company_id , this.editableContent.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              ({data}) => {
                let indexOfWebsite = this.data.websites.findIndex(website => website.id === this.editableContent.id);

                indexOfWebsite > -1 ? this.data.websites.splice(indexOfWebsite , 1) : null;
                this.isOpenEditForm = {};
              },
              (err) => console.log(err)
              
            )
     }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    
  }


}
