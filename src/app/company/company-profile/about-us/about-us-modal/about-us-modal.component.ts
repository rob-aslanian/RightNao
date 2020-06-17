import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isCorrectDate } from '../../../../_shared/dateValidation';
import { Years, MONTHS, Days } from '../../../../_shared/models/date.model';
import { IBuisnessHour } from '../../../../_shared/models/businessHours.interface';
import { AboutUsService } from 'src/app/_shared/services/companies/about-us.service';
import { IAbout } from '../../models/about.model';
import { companyType  , companyEmployee , companyParking} from 'src/app/_shared/models/company';
import { ISubindustries } from 'src/app/_shared/models/company/industries.interface';
import { PasswordValidation } from 'src/app/_shared/register.validator';

@Component({
  selector: 'app-about-us-modal',
  templateUrl: './about-us-modal.component.html',
  styleUrls: ['./about-us-modal.component.scss']
})
export class AboutUsModalComponent implements OnInit {

  private _data:any;

  @Input()  
          set data(value){
            this._data = value;

            if(value){
              this.aboutUsParseValue()
            }
          };

          get data() {
            return this._data;
          }
  
  @Output() changedData: EventEmitter<IAbout> = new EventEmitter<IAbout>();

  dropdownSettingsSubIndustry:any;
  dropdownListSubIndustrySelected = [];  
  dropdownListSubIndustry: { item_id: string; item_text: string; }[];


  companyID: any;
  industryID:string;
  submittedAddAboutUs: boolean;
  years = Years
  months = MONTHS;
  days = Days;

  addAboutUsForm:FormGroup;
  businessHours: IBuisnessHour[];

  /// Types ///
  companyTypes = companyType;
  companyTypesKey = [];

  companyEmployees = companyEmployee;
  companyEmployeesKeys = [];

  companyParking = companyParking;
  companyParkingKeys = [];

  subindustries:ISubindustries[];

  constructor(
    private f:FormBuilder,
    private aboutUsService:AboutUsService,
  ) {
    this.addAboutUsForm = this.f.group({
      description: ['', PasswordValidation.detectOnlyEnglishCharacters() ],
      mission: ['' , PasswordValidation.detectOnlyEnglishCharacters()],
      sub_industry: [''],
      company_type: [''],
      day: [''],
      month: [''],
      year: ['',],
      company_size: ['',],
      parking: ['',],
      business_hours: ['select',],
      days_business_hour: ['',],
      from_business_hour: ['',],
      to_business_hour: ['',]
    });
   }


  ngOnInit() {
    this.parseTypes();
  }

  
  get addAb() : any{
    return this.addAboutUsForm.controls;
  }


  getBusinessHours(data:IBuisnessHour[]) {
      this.businessHours = data;
  }

  parseTypes(){
    this.companyTypesKey = Object.keys(this.companyTypes);
    this.companyEmployeesKeys = Object.keys(this.companyEmployees);
    this.companyParkingKeys = Object.keys(this.companyParking);
  }


  aboutUsParseValue(){
    let company = this.data;

    if(company){
      this.companyID  = company['company_id'];
      this.industryID = company['industryId'];
      this.subindustries = company['subindustries'];

      /// Set buisness week days ///
      if(company['week_days']){
        let businessHours = company['week_days'];
      }

      /// Foundation date ///
      if(company['foundation_date']){
         let date  = company['foundation_date'].split('-'),
             day   = date[0],
             month = date[1],
             year  = date[2];

             this.addAboutUsForm.patchValue({
                day,
                month,
                year
             })
      }

      this.addAboutUsForm.patchValue({
        description:company['description'],
        mission:company['mission'],
        company_type:company['type'],
        company_size:company['size'],
        parking:company['parking'],
        from_business_hour:company['hour_from'],
        to_business_hour:company['hour_to'],
      });
    }
  }

  submitForm(form:FormGroup){
    
    this.submittedAddAboutUs = true;
   

    let date = {
      day:this.addAboutUsForm.controls['day'].value,
      month:this.addAboutUsForm.controls['month'].value,
      year:this.addAboutUsForm.controls['year'].value,
      
    };

    let foundation_date = `${date.day}-${date.month}-${date.year}`;

    
    if ( form.valid ) {

        let subindustries = new Array();
        if (this.addAb.sub_industry.value) {

          this.addAb.sub_industry.value.forEach(function (value) {
            subindustries.push(String(value.item_id));
          });

        }

        let input = {
          "company_id": this.companyID,
          "changes": {
            "description": this.addAb.description.value,
            "mission": this.addAb.mission.value,
            "industry": { 
               id: this.industryID, 
               subindustries: this.subindustries 
            },
            "type": this.addAb.company_type.value,
            "foundation_date": foundation_date,
            "size": this.addAb.company_size.value,
            "parking": this.addAb.parking.value,
            "business_hours": this.businessHours
          }
        };


        this.changedData.emit({
            company_id:this.companyID,
            description:this.addAb.description.value,
            mission:this.addAb.mission.value,
            subindustries: this.subindustries,
            foundation_date,
            parking:this.addAb.parking.value,
            size:this.addAb.company_size.value,
            type:this.addAb.company_type.value,
            business_hours:this.businessHours
        });
        
        

        this.aboutUsService.changeAboutUs(input);

   
    }else return;
  }

}
