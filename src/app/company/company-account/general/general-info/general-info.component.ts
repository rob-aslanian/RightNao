import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IGeneralInfo } from '../models/generalInfo.interface';
import { MONTHS, Years , Days} from 'src/app/_shared/models/date.model';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { companyParking, companyType, companyEmployee } from 'src/app/_shared/models/company';
import { CompanyAccountService } from 'src/app/_shared/services/companies/company-account.service';
import { subIndustry } from 'src/app/_shared/models/companyAbout.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isCorrectDate } from 'src/app/_shared/dateValidation';
import { IBuisnessHour } from 'src/app/_shared/models/businessHours.interface';
import { IIndustry, ISubindustries } from 'src/app/_shared/models/company/industries.interface';
import industriesList from 'src/assets/data/en/industries';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit , OnDestroy {


  private _data:IGeneralInfo;
  
  @Input() data:IGeneralInfo;

  @Output() result:EventEmitter<string> = new EventEmitter<string>();

  destroy$:Subject<any> = new Subject<any>();

  Months = MONTHS
  Years = Years;
  Days = Days;

  subIndustry = subIndustry;

  typeControl:FormControl;
  foundationGroup:FormGroup;
  parkingControl:FormControl;
  sizeControl:FormControl;

  isEditInudstry:boolean = false;
  isEditSubInudstry:boolean = false;
  isEditType:boolean = false;
  isEditDate:boolean = false;
  isEditSize:boolean = false;
  isEditParking:boolean = false;
  isEditHours:boolean = false;

  industries:string[];
  companyId:string = null;
  industryId:string = null;
  industryText:string = null;
  subindustries:string[];

  
  company_industries:IIndustry[] = [];
  comapnySelectedIndustry:string = null;
  subIndustriesList: ISubindustries[] = [];
  companySelectedType:string;
  comapnySize:string;
  companySelectedParking:string;
  foundationDate:string;
  businessHours:IBuisnessHour[] = [];

  submited:boolean = false;
  
  companyTypes = companyType;
  companyEmployees = companyEmployee;
  parking = companyParking;

  companyTypesKey: string[];
  companyEmployeesKeys: string[];
  companyParkingKeys: string[];
  isOpenEditForm: {
    [name:string]:boolean
  } = {};

  constructor(
    private f:FormBuilder,
    private compnayService:CompanyAccountService,
    private globalService:GlobalUserProService
  ) {

    /// Foundation Date /// 
    this.foundationGroup = this.f.group({
       day:[''],
       month:[''],
       year:[''],
    });

    this.typeControl = this.f.control('', Validators.required) /// type
    this.parkingControl = this.f.control('', Validators.required) /// parking
    this.sizeControl = this.f.control('', Validators.required) /// size

   }


  ngOnInit() {
    this.setIndustries();
    this.parseTypes();

    if(this.data){
      this.patchData();
    }
  }

  get foundDate(){
    return this.foundationGroup.controls;
  }

  setIndustries(){
    if(industriesList && industriesList.length > 0){
        this.company_industries = industriesList;
    }
  }

  parseTypes(){
    this.companyTypesKey = Object.keys(this.companyTypes);
    this.companyEmployeesKeys = Object.keys(this.companyEmployees);
    this.companyParkingKeys = Object.keys(this.parking);
  }

  patchData(){
    let { companyId  , industry , 
          foundation_date , type,
          size , parking , business_hours  } = this.data;

      this.companyId = companyId;
      this.industryId = industry.id;


    /// Parse industry ///
    if(this.industryId && this.company_industries.length > 0){
      let ind$ = this.company_industries.find(ind => ind.id == this.industryId);
      this.comapnySelectedIndustry = ind$.id;
      this.industryText = ind$.name;
    }

    /// Parse sub industry /// 
    if(industry.subindustries && industry.subindustries.length > 0){
         this.subindustries = utilities.parseSubIndustries(industry.subindustries , this.industryId);
    }


    /// Parse Type /// 
    if(type){
      this.companySelectedType = this.companyTypes[type.toString()].toString();
      this.typeControl.setValue(type);
    }

    /// Parse date founded /// 
    if(foundation_date && foundation_date !== ''){
       this.foundationDate = foundation_date;
       this.parseDate(foundation_date);
    }

    /// Parse Size ///
    if(size){
      this.comapnySize = this.companyEmployees[size];
      this.sizeControl.setValue(size);
    }

    /// Parse parking /// 
    if(parking){
      this.companySelectedParking = this.parking[parking];
      this.parkingControl.setValue(parking);
    }

    /// Parse business hour /// 
    if(business_hours && business_hours.length > 0){
      this.businessHours = business_hours;
    }

  }
  
  parseDate(foundation_date:string){
    let date = foundation_date.split('-'),
          day = date[0],
          month = date[1],
          year = date[2];

      this.foundationGroup.patchValue({
        day,
        month,
        year
      })
  }

  

  industryAbbr(sub:string[]) : string[]{
    return sub.map(sub => subIndustry[sub]);
  }
  

  getIndustry(industries:string[]){
      this.industries = industries;
  }


  businessResult(hours:IBuisnessHour[]){
    this.businessHours = hours;
  }

  clearAll(){
    this.isEditInudstry = false;
    this.isEditSubInudstry = false;
    this.isEditType = false;
    this.isEditDate = false;
    this.isEditSize = false;
    this.isEditParking = false;
    this.isEditHours = false;
  }

  toggle(type?:string) {
      this.isOpenEditForm[type] = !this.isOpenEditForm[type];
      this.result.emit('general');
      Object.keys(this.isOpenEditForm)
            .map(key => key != type ? delete this.isOpenEditForm[key] : null) /// Clear previos 


  }


  submit(type:string , e?:any){
    switch(type){
      /// Industry ///
      case'industry':{
         if(this.comapnySelectedIndustry !== null){
            let industries  =  this.company_industries
                          .find(ind => ind.id === this.comapnySelectedIndustry);

            this.industryId = industries.id;
            this.industryText = industries.name;
            this.subIndustriesList = industries.subindustries;
            this.isOpenEditForm = {};

            this.compnayService
                .changeIndustry(this.companyId , {
                  id:this.industryId
                })
                .subscribe(
                  () => {
                    this.subindustries = [];
                  }
                )

            this.globalService.updateCompanyProfile({
              industry:industries.name
            });
         }
         break;
      }
      /// Sub inudstry /// 
      case'subindustry':{
          if(this.data.industry.id){
            let input = {
              id:this.industryId,
              subindustries:this.industries
            };

            this.compnayService
                .changeIndustry(this.companyId , input)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                  ({ data }) => {
                    this.subindustries = utilities.parseSubIndustries(this.industries , this.industryId);
                    this.data.industry['subindustries'] = this.industries;
                    this.isOpenEditForm = {};
                  },
                  (err) => {
                    console.log(err);
                    
                  }
                )
          }
          break;
      }

      /// Company Type ///
      case'companyType':{
        let type = this.typeControl.value;

        if(type){
          this.compnayService
              .changeType(this.companyId , type)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                ({ data }) => {
                  this.companySelectedType = this.companyTypes[type];
                  this.isOpenEditForm = {};
                }
              )
        }

        break;
      }

      /// Foundation Date /// 
      case'foundationDate':{
        this.submited = true;
        let form = this.foundationGroup,
            { day , month , year } = form.controls;
            day = day.value;
            month = month.value;
            year = year.value;
    

        if(form.valid && isCorrectDate({year , month , day} , form)){
           let date = `${day}-${month}-${year}`;

           this.compnayService
               .changeFoundationDate(this.companyId , date)
               .pipe(takeUntil(this.destroy$))
               .subscribe(
                 ({data}) => {

                  this.foundationDate = date;
                  this.parseDate(date);
                  this.isOpenEditForm = {};

                  this.submited = false;
                 },
                 (err) => {
                   console.log(err);
                 }
               )
              
        }

        break;
      }

      /// Company size /// 
      case'size':{
        let size = this.sizeControl.value;

        if(size){
          this.compnayService
              .changeSize(this.companyId , size)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                ({ data }) => {
                  this.comapnySize = this.companyEmployees[size];
                  this.isOpenEditForm = {};
                },
                (err) => {
                  console.log(err);
                }
              )
        }

        break;
      }

      /// Company Parking ///
      case'parking':{
         let parking = this.parkingControl.value;

         if(parking){
           this.compnayService
               .changeParking(this.companyId , parking)
               .pipe(takeUntil(this.destroy$))
               .subscribe(
                 ({ data }) => {
                   this.companySelectedParking = this.parking[parking];
                   this.isOpenEditForm = {};
                 },
                 (err) => {
                   console.log(err);
                 }
               )
         }

         break;
      }

      /// Business hours ///
      case'hours':{

        if(this.businessHours){
          this.compnayService
              .changeBusinessHours(this.companyId , this.businessHours)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                ({ data }) => {
                  console.log(data);
                  this.isOpenEditForm = {};               
                },
                (err) => {
                  console.log(err);
                }
              )

        }

        break;
      }

      default:break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
