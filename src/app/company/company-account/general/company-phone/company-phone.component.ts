import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICompanyPhone } from '../models/companyPhone.interface';
import { RegionService } from 'src/app/_shared/region.service';
import { IPhone } from 'src/app/_shared/models/company/phone.interface';
import { CompanyAccountService } from 'src/app/_shared/services/companies/company-account.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-company-phone',
  templateUrl: './company-phone.component.html',
  styleUrls: ['./company-phone.component.scss']
})
export class CompanyPhoneComponent implements OnInit {

  destroy$:Subject<any> = new Subject<any>();

  @Input() data:ICompanyPhone[];
  @Input() id:string;

  @Output() result:EventEmitter<string> = new EventEmitter<string>();

  isOpenForm:boolean = false;
  formType:string = null;
  countries:any[];
  editableData:ICompanyPhone;

  phone:ICompanyPhone;
  isOpenEditForm: {
    [id:number]:boolean
  } = {};

  constructor(
    private region:RegionService,
    private companyService:CompanyAccountService
  ) { }

  ngOnInit() {
    if(this.data){
      this.getCountries();
    }
  }

  toggle(type?:string , index?:number , content?:ICompanyPhone) {

    this.formType = type;

    if(type === 'add'){
      this.isOpenForm = !this.isOpenForm;
      this.isOpenEditForm = {};
    }else{

      this.isOpenEditForm[index] = !this.isOpenEditForm[index];
      Object.keys(this.isOpenEditForm)
            .map(key => +key != index ? delete this.isOpenEditForm[key] : null) /// Clear previos 

      this.isOpenForm = false;
      this.editableData = content;
    }

    this.result.emit('phone');


  }


  getPhones(phones:IPhone){
    this.phone = phones[0];

    if(this.phone){
      let phoneIndex = this.countries.findIndex(country => country.id == this.phone.country_code_id);

       if(phoneIndex > -1){
         let country = this.countries[phoneIndex];
         return ( this.phone.country = country.country , 
                this.phone.country_code = country.country_code )
       }
  
    }

  }

  getCountries(){
    this.region
        .getListOfCountryCodes()
        .subscribe(({ data }) => {
          this.countries = data['getListOfCountryCodes'];
        
          this.data.map(phone => {
              let indexOfPhone = this.countries.findIndex(country => country.id == phone.country_code_id);

              if(indexOfPhone > -1){
                let country = this.countries[indexOfPhone];


                return ( phone.country = country.country,
                      phone.country_code = country.country_code);
              }
          })
          
        });
  }

  submit(is_primary?:boolean , phone?:any){
    if(this.id && this.phone){
      /// Add Phone /// 
        if(this.formType === 'add'){

          let phone:IPhone = {
            country_code_id:this.phone.country_code_id,
            number:this.phone.number
          };

          this.companyService
              .addPhone(this.id , phone)
              .subscribe(
                ({data}) => {
                  let id = data['AddCompanyPhone'].id;
                  this.phone.id = id;
                  this.data.unshift(this.phone);

                  this.isOpenForm = false;
                  
                },
                (err) => {
                  console.log(err);
                }
              )
        }
        /// Edit Phone  /// 
        else{
          this.data.map(ph => ph === phone ?  ph.is_primary = is_primary :  ph.is_primary = false )
          // phone.is_primary = is_primary;
          let id = this.editableData.id,
              result = {
                id,
                is_primary
              }

              if(id){
                this.companyService
                  .changePhone(this.id , result)
                  .subscribe(
                    ({ data }) => {
                      let indexOfPhone = this.data.findIndex(phone => phone.id === id);
                      // this.data[indexOfPhone] = this.phone;
                      this.isOpenEditForm = {};
                    },
                    (err) => {
                      console.log(err);
                      
                    }
                  )
              }
        }
         
    }
  }

  remove(){
    let id = this.editableData.id;

    if(id){
        this.companyService
            .deletePhone(this.id , id)
            .subscribe(
              ({data}) => {
                let indexOfPhone = this.data.findIndex(phone => phone.id === id);
                
                if(indexOfPhone > -1){
                  this.data.splice(indexOfPhone , 1);
                  this.isOpenEditForm = {};
                }

              },
              (err) => {
                console.log(err);
                
              }
            )
    }
    
  }

}
