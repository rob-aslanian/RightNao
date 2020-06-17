import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { SalaryInterval, JobSuitableFor } from 'src/app/jobs/models/postJobmodels';
import industries from 'src/assets/data/en/industries';
import { JobTypes, ExperienceYears, ICareerInterest } from 'src/app/jobs/models/userJobs.model';
import { companyEmployee } from 'src/app/_shared/models/company';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import countries from 'src/assets/data/en/countries';
import { RegionService } from 'src/app/_shared/region.service';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';
import { WalletService } from 'src/app/wallet/shared/wallet.service';

@Component({
  selector: 'app-user-career-edit',
  templateUrl: './user-career-edit.component.html',
  styleUrls: ['./user-career-edit.component.scss'  ]
})
export class UserCareerEditComponent implements OnInit , OnDestroy {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;
  
  careerForm:FormGroup;

  currencies: any[] = [];
  salaryIntervals = SalaryInterval;
  suitableFor = JobSuitableFor;
  inudstries = industries;
  jobTypes = JobTypes;
  companySizes = companyEmployee;
  experiencesYears = ExperienceYears;
  selectedCity:string;
  submited:boolean = false;
  
  constructor(
    private f:FormBuilder,
    private route: Router,
    private activeRoute:ActivatedRoute,
    private region:RegionService,
    private jobsService:UserJobsService,
    private walletService: WalletService
  ) {

    this.careerForm = this.f.group({
      jobs:['' , Validators.required],
      industry: [''],
      subindustry: [''],
      company_size: ['size_unknown'],
      job_types: this.f.array([]),
      suitable_for:this.f.array([]),
      salary_currency:[''],
      salary_min: ['' , PasswordValidation.validateMin('salary_max')],
      salary_max: ['' , PasswordValidation.validateMax('salary_min')],
      salary_interval: ['Month'],
      relocate: [false],
      remote: [false],
      travel: [false],
      experience: ['experience_unknown'],
      cities: [''],
    });

    this.currencies = utilities.getAllCurency();

   }

   get types() {
    return this.careerForm.get('job_types') as FormArray;
  }

  get suitables() {
    return this.careerForm.get('suitable_for') as FormArray;
  }

  get carrer() {
    return this.careerForm.controls;
  }


  ngOnInit() {
    this.jobTypes.map(_ => (<FormArray>this.careerForm.get('job_types')).push(new FormControl(false)) );
    this.suitableFor.map(_ => (<FormArray>this.careerForm.get('suitable_for')).push(new FormControl(false)) );

    this.patchData();
  }

  patchData(){

    const data = this.activeRoute.parent.snapshot.data.career;

    
    if(data){
        let careerData = data['career_interests'],
          { company_size , cities , experience, 
            industry , job_types , suitable_for ,  jobs , relocate ,
            remote , salary_currency , salary_interval , 
            salary_max , salary_min , travel } = careerData


      this.careerForm.patchValue({
          company_size,
          cities:cities[0],
          experience,
          industry,
          jobs:jobs[0],
          relocate,
          remote,
          salary_currency,
          salary_interval,
          salary_min,
          salary_max,
          travel
      });

      /// Parse job types checkboxes
      JobTypes.map((el , i) => {
        let id = job_types.indexOf(el.id);
        this.types.at(i).setValue(id > -1 ? el.id : false)
      });

      /// Parse suitable for checkboxes
      this.suitableFor.map((el ,i ) => {
        let id = suitable_for.indexOf(el.value);
        this.suitables.at(i).setValue(id > -1 ? el.value : false );
      })

      this.selectedCity = cities[0] ? cities[0].id : undefined;

    }

  }

  jobTypesChange(e  , type:string , idx:number) {
    let target = e.target,
        jobTypes:FormArray = this.careerForm.get(type) as FormArray;

    /// Check 
    if(target.checked) {
      jobTypes.at(idx).setValue(target.value)
    }
    /// Un-check
    else{
      jobTypes.at(idx).setValue(false)

    }
  }


  get copmanySizeKeys(){
    return Object.keys(companyEmployee);
  }

  formatLocation = (result : any) => {
    let countryName = countries[result.country] || '';

    if(result.city || countryName || result.subdivision){
      return `${result.city || ''},${countryName || ''} - ${result.subdivision || ''}`;
    }

    return '';
  }
  



 searchLocation = (text:Observable<string>) => 
   text.pipe(
     distinctUntilChanged(),
     switchMap(loc => this.region.searchInListOfAllCities(loc)),
     map(location => location['data']['getListOfAllCities'])
  )

  selectLocation(e:NgbTypeaheadSelectItemEvent){
    this.selectedCity = e.item.id;
  }

  submit(inModal:boolean = false){
    this.submited = true;
    let form = this.careerForm,
        city = !!this.selectedCity ? this.selectedCity : '',
        { job_types , suitable_for , 
          salary_min , salary_max  } = form.value;

    if(form.valid){

      job_types = job_types.filter(j => typeof j !== 'boolean');
      suitable_for = suitable_for.filter(s => typeof s !== 'boolean');

      const interests:ICareerInterest = {
        ...form.value,
        cities:[city],
        subindustry:[''],
        jobs:[form.value.jobs],
        job_types,
        suitable_for,
        salary_min:+salary_min,
        salary_max:+salary_max,
      }

      console.log(interests);


      //added coins candidate
      this.walletService.earnCoinsForWallet('become_candidate', {silver_coins: 2})
                        .subscribe ( (data) => {
                          this.walletService.changindLocalCoins(2);
                        })

      //added coins candidate
      

      /// If selected 
      if(this.jobsService.newOpp){
        this.jobsService
            .setCareerInterests(interests)
            .subscribe(
              (data) => {
                this.route.navigate(['/jobs/user']);   
              }
            )
      }
      else{
        if(!inModal){
          this.modal.open();
          this.modal.title = 'Career interest';
        }
      }

    } else { window.scrollTo({ top:0 , behavior:'smooth' }) }
  }

  ngOnDestroy(){
    this.modal.close();
  }

}
