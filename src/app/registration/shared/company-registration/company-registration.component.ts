import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

// libs
import { switchMap, filter, debounceTime, distinctUntilChanged, map, tap, takeUntil } from "rxjs/operators";

// services
import { IIndustry } from "src/app/_shared/models/company/industries.interface";
import industries from 'src/assets/data/en/industries';
import { Observable, Subject } from "rxjs";
import { companyType } from "src/app/_shared/models/company";
import { CompanyAccountService } from "src/app/_shared/services/companies/company-account.service";
import { GlobalUserProService } from "src/app/_shared/services/global-user-pro.service";
import { IComapnyRegister } from "src/app/_shared/models/company/companyRegister.interface";
import { PasswordValidation } from "src/app/_shared/register.validator";
import { utilities } from "src/app/_shared/utilities/utilities";
import { RegionService } from "src/app/_shared/region.service";
import { AppModalComponent } from "src/app/_shared/components/app-modal/app-modal.component";
import { Route, Router } from "@angular/router";
import { RegistrationService } from "../../services/registration.service";
import { NgbTypeaheadConfig } from "@ng-bootstrap/ng-bootstrap";


import { v4 as uuid  } from 'uuid';


@Component({
  selector: "app-company-registration",
  templateUrl: "./company-registration.component.html",
  styleUrls: [
    "./company-registration.component.scss",
    "../../../_shared/css/registration_shared_styles.scss"
  ]
})
export class CompanyRegistrationComponent implements OnInit , OnDestroy {


  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  destroy$:Subject<any> = new Subject<any>();
  form: FormGroup;
  formSubmitted = false;
  showError:boolean = false;
  //define variables that they are array of objects
  countries:Observable<any>;
  cities: { id: string; city: string; subdivision: string; country: string }[];
  countryCodes: { id: string; country: string; country_code: string }[];

  company_industries: IIndustry[] = [];

  selectedCountry:string;
  selectedCity:any;

  companyTypesKey: string[];
  companyTypes = companyType;
  utils = utilities;
  isLoading:boolean = false;
  isModalOpen:boolean = false;
  user:any;
  type:string = 'company';
  inviterId: string ='';
  
  constructor(
    private formBuilder: FormBuilder,
    private comapnyService:CompanyAccountService,
    private global:GlobalUserProService,
    private region: RegionService,
    private router:Router,
    private regService:RegistrationService,
    private ngbTypeheadConfig:NgbTypeaheadConfig
  ) {

    
    this.form = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required , PasswordValidation.detectOnlyEnglishCharacters()])],
      email: ["", Validators.compose([Validators.required , Validators.email])],
      url: ["",Validators.compose([Validators.required , PasswordValidation.detectOnlyEnglishCharacters()])],
      phone: ["", Validators.required],
      country_code_id: ["", Validators.required],
      foundation_year: [""],
      industry: ["", Validators.required],
      websites:[""],
      type: ["", Validators.required],
      address: ["",Validators.compose([Validators.required , PasswordValidation.detectOnlyEnglishCharacters()])],
      apartment: ["" , Validators.compose([PasswordValidation.detectOnlyEnglishCharacters()])],
      zip: ["", Validators.compose([Validators.required , PasswordValidation.detectNumberAndSymbols()])],
      city_code: ["",  Validators.compose([Validators.required , PasswordValidation.detectString()])],
      state:[{value:'' , disabled:true}],
      country: ["", Validators.required],
      verify: ["", Validators.required],
      vat: ["" , PasswordValidation.detectEnglishDashSpace()]
    });

    this.type = regService.profileType || 'company';

    ngbTypeheadConfig.showHint = true;

    // Get invited id
    this.inviterId =  this.global.getInviterID;
    

  }

  
  ngOnInit() {

    this.setIndustries();

    this.countries = this.region.Countries;
    this.companyTypesKey = Object.keys(this.companyTypes);
    
    this.region
        .getListOfCountryCodes()
        .pipe(takeUntil(this.destroy$))
        .subscribe(({ data }) => {
            this.countryCodes = data["getListOfCountryCodes"];
        });

    this.user = this.global.isAuthenticated() && this.global.getUserProfile();

  }


  generateUrl(){
    let name:string = this.form.get('name').value.toLowerCase();

    if (name) {
      name = name.replace(/\s+/g , '_');
    }
     
    this.comapnyService.CheckUrlForCompany(name)
          .pipe(
            takeUntil(this.destroy$),
            distinctUntilChanged(),
            map(({data}) => data['CheckIfURLForCompanyIsTaken'])
          )
          .subscribe(isTaken => {
              const urlName = !isTaken ? name : `${name}_${uuid().split('-')[0]}`
            
              this.form.get('url').setValue(urlName);
            
          })

  }

  open(){
    this.modal.open();
    this.isModalOpen = true;
  }

  signOut(){
    this.global.signOut()
  }

  setIndustries(){
    if(industries && industries.length > 0){
       this.company_industries = industries;
    }
  }


  public get f() {
    return this.form.controls;
  }
  

  selectCountry(e){
    let target = e.target;
    this.form.get('city_code').enable();
    target ? this.selectedCountry = target.value : null;

    /// Reset city ///
    this.selectedCity = '';
  }

  cityFormatter = (result: any) => result.city;


  searchCity = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term) =>  this.getCities(term) )
  )

  getCities(term?:string){

    if(this.selectedCity === null && this.selectedCountry === null) return;


    let city = this.selectedCity !== null ? 
               this.selectedCity.city || this.selectedCity : '';


    if(city !== ''){

      return this.region
                .getCities(this.selectedCountry ,city)
                .pipe(
                  map(({data}) => data['getListOfCities']),
                  filter(cities => {
                    return cities.filter(c => c.city.toLowerCase()
                                  .indexOf(term.toLowerCase()) > -1)
                                  .slice(0, 10)
                  })
                  )
    }
  }

  selectCity(e){

    if(!e || !e.item){
        return;
    }
    this.form.get('state').setValue(e.item.subdivision || '');
  }

  public register() {  


    if (this.form.invalid) {
      this.formSubmitted = true;
      return;
    }
 

    const variablesInput = {
      name: this.form.controls.name.value,
      email: this.form.controls.email.value,
      url: this.form.controls.url.value.toLowerCase(),
      phone: {
        country_code_id: Number(this.form.controls.country_code_id.value),
        number: this.form.controls.phone.value
      },
      websites:[this.form.controls.websites.value.toLowerCase()],
      foundation_year: Number(this.form.controls.foundation_year.value),
      industry: this.form.controls.industry.value,
      type: this.form.controls.type.value,
      address: this.form.controls.address.value,
      apartment: this.form.controls.apartment.value,
      zip: this.form.controls.zip.value,
      city_id: this.form.controls.city_code.value.id,
      vat: this.form.controls.vat.value,
      invited_by: this.inviterId
    } as IComapnyRegister;


    this.comapnyService
        .registerCompany(variablesInput)
        .pipe(
          takeUntil(this.destroy$),
          tap(() => this.isLoading = true)
        )
        .subscribe(
          (data) => {
            let { id,  url} = data;

            this.formSubmitted = false;
            this.isLoading = false;
            
            this.global
                .storeCompanyProfile({
                  id,
                  url,
                  avatar:'',
                  name:variablesInput['name'],
                  country_id:this.form.get('country').value,

                })

            this.form.get('phone').setErrors(null);

            // Remove invated id from local storage
            if( this.global.getInviterID ) {
                 this.global.removeInviterID();
            }
          
            setTimeout(() => this.router.navigate(['/company/profile' , url]) , 200)
          },
          (errs:any) =>  {
             this.isLoading = false;

             if (Array.isArray(errs)){
                errs.map((err:string) => {
                  if(err.endsWith('valid phone number')) {
                    this.form.get('phone').setErrors({phone:true});
                  }
                })
             }else {
 
                if(String(errs).endsWith('valid phone number')) {
                  this.form.get('phone').setErrors({phone:true});
                }
             }
        
           
          }

        )

  }
  Error(){
    this.showError = true;
  }
  
  checkIfCompanyUrlIsTaken(e):void{
      e.preventDefault();

       this.form.get('url').setErrors(null);
        let url = this.form.get('url').value.toLowerCase();

        if (url) {
          this.form.get('url')
              .setValue(url.replace(/\s+/g , '_'))
        }
         
          this.comapnyService.CheckUrlForCompany(url)
          .pipe(
            takeUntil(this.destroy$),
            distinctUntilChanged(),
          )
          .subscribe(({data}) => {
              let isTaken = data['CheckIfURLForCompanyIsTaken'];
                 if(isTaken) this.form.get('url').setErrors({url_exist:true});
                 else this.form.get('url').setErrors(null) 
          });
  }

  ngOnDestroy(): void {
    this.modal.close();
    this.destroy$.next();
    this.destroy$.complete();

  }
  
}
