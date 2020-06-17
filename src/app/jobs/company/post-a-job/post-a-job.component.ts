import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { graphqlShared } from '../../../_shared/graphql/shared/base-data';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionService } from '../../../_shared/region.service';
import { JobBenefitsModalComponent } from '../../job-benefits-modal/job-benefits-modal.component';
import { GlobalUserProService } from '../../../_shared/services/global-user-pro.service';
import { utilities } from 'src/app/_shared/utilities/utilities';

import { Days, MONTHS, Years } from 'src/app/_shared/models/date.model';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { IJob, IJobMeta } from 'src/app/_shared/models/jobs/jobs.interface';
import { PlanPrices, Renewal, Languages, JobBenefits, JobHighlight, JobAdditionalCompensation, JobSuitableFor, JobFunctions, JobMetaDays } from '../../models/postJobmodels';
import { JobsCompanyService } from 'src/app/_shared/services/jobs/jobs-company.service';
import { JobTypes } from '../../models/userJobs.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { JobAdditionalInfoComponent } from './job-additional-info/job-additional-info.component';

@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  encapsulation:ViewEncapsulation.None,
  styleUrls: ['./post-a-job.component.scss', '../company-jobs/company-jobs.component.scss', '../../job-list/job-list.component.scss']
})
export class PostAJobComponent implements OnInit {
  isCompany: boolean = false;
  companyId:string;
  activePage: number = 1;
  form: FormGroup;
  employmentTypes = JobTypes;


  highlights = JobHighlight;
  additionalCompensations = JobAdditionalCompensation;

  cityQuerySubscription: any;
  cities: any = [];
  languages: any = [];
  planPricingQuerySubscription: any;
  addCountryPopoverVisible: boolean = false;
  showAddLanguage:boolean = false;
  skills:string[] = [];
  descriptionLanguages: string[] = [];
  days = Days;
  months = MONTHS;
  years = Years;
  required_languages:string[] = [];
  openPreview:boolean = false;
  selectedLang: {
    [id:number]:boolean
  } = {
    0:true
  }
  jobsMeta:IJobMeta;
  utils = utilities;
  planPrices = PlanPrices;
  jobDays = JobMetaDays;
  activeDay:number;
  planPricesAll:any;
  renewalPrice:number = 0;
  anonymusPrice:number = 0;
  totalPricesCountries:any[];
  totalPrice:number = 0;
  countries//:Observable<any>;
  submitedSecondPage:boolean = false;

  jobId:string;
  jobStatus:string;
  submited:boolean = false;
  qualifications: any;

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;
  @ViewChild(JobAdditionalInfoComponent, { static: false }) addInfo:JobAdditionalInfoComponent;

  modalType: string;
  totalCount: string;

  dropdownJobFunctionsSettings = {
    singleSelection: false,
    idField: 'value',
    textField: 'name',
    itemsShowLimit: 3,
    limitSelection:5,
    allowSearchFilter: true,
    disabled:true,
  }

  dropdownFunctionList = JobFunctions;


  constructor(
    private formBuilder: FormBuilder, 
    private apollo: Apollo, 
    private regionService: RegionService, 
    private modalService: NgbModal,
    private jobsCompanyService:JobsCompanyService,
    private globalUserProfileService: GlobalUserProService,
    private route:Router,
    private router:ActivatedRoute) {

    this.isCompany = globalUserProfileService.isCompanyActive();
    this.companyId = this.globalUserProfileService.getComapnyId();


    this.form = this.formBuilder.group({
      details: this.formBuilder.group({
        title: ['' , Validators.required],
        countryTypeahead: [''],
        cityTypeahead: [''],
        country: [''],
        region: [{value:'' , disabled:true}],
        city: [{value:'' , disabled:true}],
        location_type:['On_Site_Work'],
        job_functions: [], //this.formBuilder.array([]),
        employment_types: ['' , Validators.required],
        descriptions: this.formBuilder.array([this.initJobDescription()]),
        additional_compensation:this.formBuilder.array([]),
        additional_info: this.formBuilder.group({
          travel_requirement: ['none'],
          suitable_for:this.formBuilder.array([]),
        }),
        salary_currency: [''],
        salary_min: [0 , PasswordValidation.validateMin('salary_max')],
        salary_max: [0 ,  PasswordValidation.validateMax('salary_min')],
        salary_interval: ['Any'],
        benefits: this.formBuilder.array([]),
        number_of_positions: [0],
        is_willing_to_work_remotly:[false],
        cover_letter: [false],
      }),
      meta: this.formBuilder.group({
        advertisements: this.formBuilder.array([]),
        active_advertisement: this.formBuilder.group({
          advertisement_id: [this.globalUserProfileService.getCompanyProfile().country_id || 'GE'],
          advertisement_countries: [this.globalUserProfileService.getCompanyProfile().country_id || "GE"],
          renewal: [0, Validators.required],
          languages:[1],
          renewal_price: [0],
          amount_of_days:[30],
          // job_plan: ['basic', Validators.required],
          // job_plan_price: [0],
          anonymous: [false],
          anonymous_price: [0],
          num_of_languages: [1],
          currency: ['HPC'],
          total_price: [0],
          highlight:['none']
        })
      })
    });



  }

  ngOnInit() {
    if (!this.isCompany) {
      return;
    }

  

    /// Edit Post
    if(this.router.snapshot.params['id']){
       let id = this.router.snapshot.params['id'];
       this.getJob(id);
    }

    this.initArrayForms();
    this.disableCity();

    // Get Base Data
    this.getBaseData();
    // Subscribe Active Advertisement Value Changes
    this.activeJobAdvertisement.valueChanges.subscribe(value => {

      let jobAdvControl = this.activeJobAdvertisement;


      if (!jobAdvControl) {
        return;
      }
      if (jobAdvControl.value.amount_of_days !== value.amount_of_days) {
        jobAdvControl.patchValue({
          amount_of_days: value.amount_of_days
        });
      }
      if (jobAdvControl.value.advertisement_countries !== value.advertisement_countries) {
        jobAdvControl.patchValue({
          advertisement_countries: value.advertisement_countries
        });
      }
      if (jobAdvControl.value.currency !== value.currency) {
        jobAdvControl.patchValue({
          currency: value.currency
        });
      }
      if (jobAdvControl.value.renewal !== value.renewal) {
        jobAdvControl.patchValue({
          renewal: value.renewal
        });
      }
      if (jobAdvControl.value.anonymous !== value.anonymous) {
        jobAdvControl.patchValue({
          anonymous: value.anonymous
        });
      }
      if (jobAdvControl.value.num_of_languages !== value.num_of_languages) {
        jobAdvControl.patchValue({
          num_of_languages: value.num_of_languages
        });
      }

      // Update Pricing
      this.getPricing();
    });
  }

  initArrayForms(){
     let _additionalInfo = this.jobDetails.get('additional_info') as FormGroup,
         _sutiables = _additionalInfo.get('suitable_for') as FormArray,
         _compens   = this.jobDetails.get('additional_compensation') as FormArray;

    /// Compensations 
    JobAdditionalCompensation.map(_ => _compens.push(new FormControl(false)))
    /// Suitable for
    JobSuitableFor.map(_ => _sutiables.push(new FormControl(false)));
    
  }

  disableCity(){
     this.jobCountry
         .valueChanges
         .subscribe(
           (country) => !country ? this.jobCity.disable() :
                                   this.jobCity.enable()
         )
  }

  // Get Job Advertisement against id
  getJobAdvertisementById(id: any) {

    if (!this.jobAdvertisements) {
      return;
    }

    var jobAdvert = this.jobAdvertisements.controls.filter(adv => {
      return adv.value.advertisement_id === id;
    });
    if (!jobAdvert) {
      return;
    }
    return jobAdvert[0];
  }

  // Get Base Data
  getBaseData() {
    // Get Countries
    this.regionService.Countries.subscribe(
      (data) =>   this.countries  = data,
      (err) => console.log(err)
      
    )
    // Get Languages
    this.getLanguages();

    // Get Prices 
    this.getPricing()
    

  }



  getJob(id:string){
    this.jobsCompanyService
        .getCompanyJob(this.companyId , id)
        .subscribe(
          ({data}) => {
            let job = data.GetJobForCompany;
            return this.patchData(job);
          },
          (err) => console.log(err)
          
        )
  }

  getQualification = (quals) => this.qualifications = quals;

  patchData(job){
    let { job_details , job_meta , status , id} = job,
        details = this.jobDetails,
        detailsKey = Object.keys(job_details),
        meta = this.activeJobAdvertisement,
        metaKeys =  Object.keys(job_meta);
      

    this.jobId = id;
    this.jobStatus = status;
    
     /// Parse meta
     if(status !== 'Draft') this.activeJobAdvertisement.disable();

     metaKeys.map(key => {
       let formMeta = this.activeJobAdvertisement.controls[key];

       if(formMeta !== undefined){
          meta.get(key).setValue(job_meta[key]);
       }       
     });

    /// Parse details 

    detailsKey.map(key => {

      /// Parse city 
      if(key === 'location'){
        this.jobCity.setValue(job_details['location']);
        this.jobCity.enable();
        
      }
   
      if(details.get(key)){
        /// Form Controls 
        if(details.get(key) instanceof FormControl){
            details.get(key).setValue(job_details[key]);
        }

        /// Form Arrays 
        else{
          switch(key){
            case'descriptions':{
              let descriptions = job_details['descriptions'];
              descriptions.map(des => {
                if(des.language === this.descriptionLanguages[0]){
                  this.jobDescriptions.at(0).patchValue({
                    language:des.language,
                    description:des.description,
                    why_us:des.why_us
                  });
                }
                else{
                  this.descriptionLanguages.push(des.language);
                  this.jobDescriptions.push(this.formBuilder.group({
                    language:[des.language],
                    description:[des.description],
                    why_us:[des.why_us]
                }));
              }

               this.selectedLanguageTab(descriptions.length - 1);
                
              })
              break;
            }
            case'required_languages':{
              this.required_languages = job_details['required_languages'];
              break;
            }

            case'job_functions':{
              let functions = job_details['job_functions'];

              break;
            }
            // case'required_educations':{
            //   let educations = job_details['required_educations'];
            //   educations.map(educ => this.addEducation(educ));
            //   break;
            // }

            // case'required_skills':{
            //   let skills = job_details['required_skills'];
            //   skills.map(skill => this.addSkills(skill));
            //   break;
            // }
            case'benefits':{
              let benefits:any[] = job_details['benefits'];

              if(benefits.length > 0){
                 benefits = benefits.map(ben => JobBenefits
                                    .filter(b => b.id === ben)[0]);
              }
              
              this.insertBenefits(benefits);
              break;
            }

            default:break;
          }
        };
      }
      
    })


    
  }


  initData() : IJob{
    let { title , country  , city , region,
          job_functions, employment_types , salary_min , salary_max , salary_currency,
          salary_interval , descriptions , benefits  , number_of_positions,
          cover_letter , is_willing_to_work_remotly , location_type , additional_compensation ,
          additional_info } = this.form.get('details').value;

    

      
    
    descriptions.map((el , i) => {
      el.language = this.descriptionLanguages[i];
    });

    benefits = benefits.map(el => el.id);


    let suitable_for   = additional_info['suitable_for'].filter(s => typeof s !== 'boolean'),
        travel_requirement = additional_info['travel_requirement'],
        files = this.addInfo ? this.addInfo.files.documents : [];
        additional_compensation  = additional_compensation.filter(c => typeof c !== 'boolean');
        job_functions = job_functions.map(jFn => jFn.value);

    return {
      companyId:this.companyId,
      details:{
        title,
        country,
        city:city ? city.id : undefined,
        region,
        location_type,
        job_functions,
        employment_types,
        salary_currency,
        salary_interval,
        salary_max,
        salary_min,
        descriptions,
        benefits,
        number_of_positions,
        _city:city ? city.city : undefined,
        cover_letter,
        is_willing_to_work_remotly,
        additional_compensation,
        additional_info:{
          travel_requirement,
          suitable_for,
        },
        _files:files,
        ...this.qualifications,
      },
      meta:this.jobsMeta
    }


  }

  selectedLanguageTab(index:number){
    this.selectedLang[index] = true;
    Object.keys(this.selectedLang)
          .map(key => +key != index ? delete this.selectedLang[key] : null) /// Clear previos 
  }

  // getPrices(){
  //   /**@@@ Temporary @@@ */
  //   if(this.companyId){
  //     this.jobsCompanyService
  //         .GetPlanPrices(this.companyId , ['GE'] , this.activeJobAdvertisement.get('currency').value ) // @Temporary
  //         .subscribe(
  //           ({data}) => {
  //             let planPrices = 
  //             this.planPricesAll = data.GetPlanPrices[0];
  //            if(this.planPricesAll){
  //             let prices = data.GetPlanPrices[0],
  //             pricePerPlan = prices['price_per_plan'];

  //             this.planPricesKeys.map(key => {
  //               this.planPrices[key].price = pricePerPlan[key];
  //             });

  //            }
              
  //           }
  //         )
  //   }
  // }

  get planPricesKeys() : string[]{
    return Object.keys(PlanPrices);
  }

  get renewals() : number[]{
    return Renewal;
  }
  
  get planLanguages() : number[]{
    return Languages;
  }

  initJobDescription() : FormGroup{
    return  this.formBuilder.group({
      language: [''],
      description: ['', Validators.compose([Validators.required , Validators.maxLength(5000)])],
      why_us: ['']
    })
  }
 
  getLanguageName(lang:string){
    return utilities.getLanguage(lang);
  }

  get jobAmountOfDays(){
    return this.activeJobAdvertisement.get('amount_of_days').value;
  }

  setRenewal(e){

    
    let renewal = this.activeJobAdvertisement.get('renewal').value,
        renewals = this.planPricesAll.features.renewal;

    this.renewalPrice = renewals[renewal];

  }

  setAnonymously(e){
    let target = e.target,
        isChecked = target.checked;

      this.anonymusPrice =  isChecked ? this.planPricesAll.features.anonymously : 0;

  }

  // Get Job Details
  get jobDetails() {
    if (!this.form) {
      return;
    }

    return this.form.get('details') as FormGroup;
  }

  get details(){
    return this.jobDetails.controls;
  }


  // Get Job Descriptions
  get jobDescriptions() {
    if (!this.jobDetails) {
      return;
    }

    return this.jobDetails.get('descriptions') as FormArray;
  }

  // Get Job Functions
  get jobFunctions() {
    if (!this.jobDetails) {
      return;
    }

    return this.jobDetails.get('job_functions') as FormArray;
  }

  get jobLocationType(){
      return this.jobDetails.get('location_type');
  }

  // Get Job Country
  get jobCountry() {
    if (!this.jobDetails) {
      return;
    }

    return this.jobDetails.get('country');
  }

  // Get Job City
  get jobCity() {
    if (!this.jobDetails) {
      return;
    }

    return this.jobDetails.get('city');
  }

  // Get Job CountryTypeahead
  get jobCountryTypeahead() {
    if (!this.jobDetails) {
      return;
    }

    return this.jobDetails.get('countryTypeahead');
  }

  // Get Job CityTypeahead
  get jobCityTypeahead() {
    if (!this.jobDetails) {
      return;
    }

    return this.jobDetails.get('cityTypeahead');
  }


  // Get Job Languages
  get jobLanguages() {
    if (!this.jobDetails) {
      return;
    }

    return this.jobDetails.get('required_languages') as FormArray;
  }

  // Get Job Benefits
  get jobBenefits() {
    if (!this.jobDetails) {
      return;
    }

    return this.jobDetails.get('benefits') as FormArray;
  }

  // Get Job Meta Data
  get jobMeta() {
    if (!this.form) {
      return;
    }

    return this.form.get('meta') as FormGroup;
  }

  // Get Job Advertisements
  get jobAdvertisements() {
    if (!this.jobMeta) {
      return;
    }

    return this.jobMeta.get('advertisements') as FormArray;
  }

  // Get Active Advertisement
  get activeJobAdvertisement() {
    if (!this.jobMeta) {
      return;
    }

    return this.jobMeta.get('active_advertisement') as FormGroup;
  }

  // Get Active Advertisement Countries
  get activeJobAdvertisementCountries() {
    if (!this.activeJobAdvertisement) {
      return;
    }

    return this.activeJobAdvertisement.get('advertisement_countries') as FormArray;
  }

  // Add Job Description Form Group
  addJobDescription() {
    if (!this.jobDescriptions) {
      return;
    }

    this.jobDescriptions.push(
      this.formBuilder.group({
        language: ['', Validators.required],
        description: ['', Validators.required],
        why_us: ['']
      })
    );
  }



  // Add Language
  addLanguage(value: string , type?:string , index?:number) {


    this.showAddLanguage = !this.showAddLanguage;


    if(type == 'required_languages' ){

      if (!this.required_languages || this.required_languages.length === 5) {
        return;
      }
      this.required_languages.push(value);  

    }
    else { 

      if(!this.descriptionLanguages.includes(value)){
        this.descriptionLanguages.push(value); 
        this.jobDescriptions.push(this.initJobDescription());
      }
     
    }
    
  }



  // Add Advertisement
  addAdvertisement(country, currency) {
    if (!this.jobAdvertisements) {
      return;
    }

    this.jobAdvertisements.push(
      this.formBuilder.group({
        advertisement_id: [-(this.jobAdvertisements.controls.length + 1)],
        advertisement_countries: this.formBuilder.array([this.formBuilder.control(country)]),
        renewal: [0, Validators.required],
        renewal_price: [0],
        amount_of_days:[0],
        job_plan: ['basic', Validators.required],
        job_plan_price: [0],
        anonymous: [false],
        anonymous_price: [0],
        num_of_languages: [1],
        currency: [currency],
        total_price: [0]
      })
    );
  }

  // Remove Advertisement
  removeAdvertisement(advertisementIndex: any) {
    this.jobAdvertisements.removeAt(advertisementIndex);
  }


  // Select Advertisement
  selectAdvertisement(advertisement: any) {
    if (this.activeJobAdvertisement.value.advertisement_id !== advertisement.value.advertisement_id) {
      this.activeJobAdvertisement.patchValue(advertisement.value);
      while (this.activeJobAdvertisementCountries.length !== 0) {
        this.activeJobAdvertisementCountries.removeAt(0);
      }
      advertisement.value.advertisement_countries.forEach(country => {
        this.activeJobAdvertisementCountries.push(this.formBuilder.control(country));
      });
    }
  }

  // Initialize plan with company's default country
  initializePlan() {
    // Get country name & currency for current company
    let country = this.globalUserProfileService.getCompanyProfile().country_id || "GE"; // Using GE as default country if no exist, for testing
    let currency = "GEL"; // Need to get currency against country
    this.setupPlan(country, currency);
  }

  // Setup plan against provided country code & currency
  setupPlan(country_code: any, currency: any) {
    // this.addAdvertisement("GE", currency);
    // this.selectAdvertisement(this.jobAdvertisements.controls[this.jobAdvertisements.controls.length - 1]);
    // Get Pricing for plan
    this.getPricing();
  }

  // Get Pricing against active advertisement country
  getPricing() {
    

    console.log(this.jobMeta);
    
    if (!this.activeJobAdvertisement) {
      return;
    }


    let { renewal , amount_of_days , anonymous, 
      num_of_languages , advertisement_countries , currency} = this.activeJobAdvertisement.value;
    

    /// @@@ Temporary @@@ ///
    this.jobsMeta = {
       advertisement_countries,
       anonymous,
       currency,
       amount_of_days:+amount_of_days,
       num_of_languages,
       renewal,
    };

      this.jobsCompanyService
          .getPricingFor(this.companyId , this.jobsMeta)
          .subscribe(
            ({data}) => {
              let pricingFor = data.GetPricingFor;
              this.totalPricesCountries = pricingFor.countries;
              this.totalPrice = pricingFor.total.toFixed(2)

            }
          )

  }

  // Add country button handler
  onAddCountry(event: any) {
    if (event) {
      event.stopImmediatePropagation();
    }

    // Show Add Country Popover
    this.addCountryPopoverVisible = !this.addCountryPopoverVisible;
  }

  // On Select Country
  onSelectCountry(e: any) {
    // this.jobCountry.patchValue(item);
    let target = e.target;
      
    target ? this.jobCountry.patchValue(target.value)  : null;
  
    /// Reset city ///
    this.jobCity.patchValue("");
    this.jobCityTypeahead.patchValue("");
  }

  // On Select Country For Advertisement
  onSelectCountryForAdvertisement(event: any, countryInput: any) {
    // Get Currency against selected country
    let currency = "USD"; // need to get it against country
    countryInput.value = '';
    
    let countries = this.activeJobAdvertisementCountries.value;


    if(countries && !countries.includes(event.item.name)){
      this.onAddCountry(null);
      // Adds advertisement country & selects this country as active and setup plan
      this.setupPlan(event.item.asc, currency);
    }
  

  }

  removeCountry(index:number){ 
    this.jobAdvertisements.removeAt(index);
    
  }


  selectJobPlan(e , days:number , i:number){
    
     this.activeDay = i;
     this.activeJobAdvertisement.get('amount_of_days').setValue(days ? days : 0);
  }

  // Country Typeahead formatter
  countryFormatter = (result: any) => result.name;

  // Get List of Cities
  getCities() {
    if (!this.jobCountry.value || !this.jobCity.value) return;

    if (this.cityQuerySubscription) {
      this.cityQuerySubscription.unsubscribe();
    }

    this.cityQuerySubscription = this.apollo.watchQuery({
      query: graphqlShared.getListOfCities,
      variables: {
        "search_city": {
          "country_id": this.jobCountry.value,
          "find_city": this.jobCity.value
        }
      }
    }).valueChanges.subscribe
      (({ data, errors }) => {
        if (errors) {
          console.log(errors);
        }
        if (!data) {
          return;
        }
        this.cities = data["getListOfCities"];
      },
      ({ error }) => {
        console.log(error);
      });
  }

  // Search City
  searchCity = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length === 0 ? []
        : this.cities.filter(c => c.city.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  // City Typeahead formatter
  cityFormatter = (result: any) => result.city;

  // On Select City
  onSelectCity(e: any) {
    this.jobCity.patchValue(e.item.id);
    this.details['region'].setValue(e.item.subdivision);
  }

  // Get List of languages
  getLanguages() {
    let companyLanguage =  "ka";

    this.languages = this.regionService.getListOfLanguages();
    this.descriptionLanguages.push(companyLanguage);
    
  }

  // Get Available Languages
  getAvailableLanguages() {
    if (!this.jobLanguages || this.jobLanguages.controls.length === 0) {
      return this.languages;
    }

    let availableLanguages: any = [];
    this.languages.forEach(language => {
      let job_langs = this.jobLanguages.controls.filter(jobLang => {
        return jobLang.value === language.item_id;
      });
      if (!job_langs || job_langs.length === 0) {
        availableLanguages.push(language);
      }
    });
    return availableLanguages;
  }

  // Search Language
  searchLanguage = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length === 0 ? []
        : this.getAvailableLanguages().filter(c => c.item_text.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  // On Select Language
  onSelectLanguage(event: any, languageInput: any, type?:string , index?:number ) {
    if (event) {
      event.preventDefault();
    }
    this.addLanguage(event.item.item_id , type , index);
    languageInput.value = '';


  }

  // Language Typeahead Formatter
  languageFormatter = (result: any) => result.item_text;

  compensationChange(e , idx:number) {
    let target = e.target,
        compensations:FormArray = this.jobDetails.get('additional_compensation') as FormArray;

    /// Check 
    if(target.checked) {
      compensations.at(idx).setValue(target.value)
    }
    /// Un-check
    else{
      compensations.at(idx).setValue(false)

    }
  }

  // Open Benefits Modal
  openBenefitsModal(event: any) {
    const modalRef = this.modalService.open(JobBenefitsModalComponent);
    modalRef.componentInstance.existingBenefits = this.jobBenefits.controls.map(benefit => benefit.value);
    modalRef.result.then((result) => {
      this.insertBenefits(result);
    },
      (reason) => {
      }
    );

    if (!event) {
      return;
    }

    event.preventDefault();
  }

  // Insert benefits
  insertBenefits(benefits: any[]) {
    if (!benefits) {
      return;
    }

    // Remove All
    if (benefits.length === 0) {
      this.jobBenefits.controls.splice(0);
      return;
    }

    // Clear all
    this.jobBenefits.controls.splice(0);
    // Add selected ones
    benefits.forEach(benefit => {
      this.jobBenefits.push(this.formBuilder.control(benefit));
    });
  }

  // Remove Benefit
  removeBenefit(benefitIndex: any) {
    this.jobBenefits.removeAt(benefitIndex);
  }

  open(type?:string){

    this.modalType = type;

    if(type === 'preview'){
      this.modal.title = 'Post a job';
      this.openPreview = true;
      this.modal.open();

    }

    if(type === 'payment'){
        this.submited = true;

        if(this.form.valid){    
          this.totalCount = `${this.totalPrice} ${this.activeJobAdvertisement.value.currency}`;
          this.modal.title = 'Credit card information';
          this.modal.open();
        }
    }

  }

  

  // Go to Next Page
  gotoNextPage() {
    window.scrollTo({top:0 ,behavior:'smooth'});

    /// Second page
    if(this.activePage === 2){
      this.submitedSecondPage = true;
      let title   = this.details['title'],
          employement = this.details['employment_types'],
          descriptions = this.jobDescriptions,
          functions    = this.jobFunctions;



       if(employement.valid && descriptions.valid &&
          title.valid && functions.valid){
            this.activePage = this.activePage + 1;
            this.submitedSecondPage = false;
        }
        else{

          title.markAsDirty();
          employement.markAsDirty();
       
          descriptions.controls
                      .map(control => control
                      .get('description').markAsDirty());
         
        }
    }else {
        this.activePage = this.activePage + 1;
    }

  }


  // Go to Previous Page
  gotoPreviousPage() {
    window.scrollTo({top:0 ,behavior:'smooth'})
    this.activePage = this.activePage - 1;
  }


  publish(){
    this.submited = true;
    if(this.form.valid){
      this.modal.close();
      /// Add Job 
      if(!this.jobStatus){
        this.jobsCompanyService
            .postJob(this.initData())
            .subscribe(
              (data) => {
                this.route.navigate(['jobs/company/dashboard/my-jobs'])
                
              }
            )
      }
      /// Edit job
      else{
          this.jobsCompanyService
              .changePost(this.companyId , 
                          this.jobId , 
                          this.initData()['details'])
              .subscribe(
                (data) => {
                  /// Change draft status to active 
                  if(this.jobStatus === 'Draft'){
                    this.jobsCompanyService
                        .activeJob(this.companyId , this.jobId)
                        .subscribe();
                  }

                  this.route.navigate(['jobs/company/dashboard/my-jobs'])
                },
                (err) => console.log(err)

              )
      }
   }
  }

  saveAsDraft(){
    if(!this.jobStatus && this.jobStatus !== 'Draft'){
      this.jobsCompanyService
          .saveDraft(this.initData())
          .subscribe(
            (data) => {
              console.log(data);
              this.route.navigate(['jobs/company/dashboard/my-jobs'])
              
            }
          )
    }else{
      this.jobsCompanyService
          .changeDraft(
                  this.companyId,
                  this.jobId,
                  this.initData()
          )
          .subscribe(
            (data) => {  this.route.navigate(['jobs/company/dashboard/my-jobs']) }
          )
    }
  }

  getPreview({publish , draft}){
    
    /// Publish 
    if(publish) return this.open('payment');

    /// Save as draft 
    if(draft) return this.saveAsDraft();
     
  }


}
