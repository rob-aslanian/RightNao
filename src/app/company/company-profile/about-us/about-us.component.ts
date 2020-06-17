import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IAbout } from '../models/about.model';
import { subIndustry } from '../../../_shared/models/companyAbout.model';
import { AppModalComponent } from '../../../_shared/components/app-modal/app-modal.component';
import { companyType  , companyEmployee , companyParking} from 'src/app/_shared/models/company';
import industries from 'src/assets/data/en/industries';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  
  private _data:IAbout;

  @Input() isAdmin:boolean = false;
  @Input() 
        set companyProfile(value: IAbout){
            this._data = value;
            
            this.getData();
        }

        get companyProfile(){
           return this._data;
        }

  @ViewChild(AppModalComponent, { static: true }) modal: AppModalComponent;

  hasAbout:boolean = false;
  
  aboutUsContent:IAbout;
  industryID:string;
  subindustries:any;

  companyType = companyType;
  companyEmployee = companyEmployee;
  companyParking = companyParking;

  constructor(
     private translate: TranslateService
  ) { }

  ngOnInit() {
    this.industryID = this.companyProfile['industry'].id;

    this.getData();
  }

  getData(){
    this.aboutUsContent = {
      company_id:this.companyProfile['id'],
      description:this.companyProfile['description'],
      type: this.companyProfile['type'],
      size:this.companyProfile['size'],
      parking:this.companyProfile['parking'],
      foundation_date:this.companyProfile['foundation_date'],
      mission:this.companyProfile['mission'],
      business_hours:this.companyProfile['business_hours'],
      industryId:this.companyProfile['industry'].id,
      subindustries:this.companyProfile['industry']['subindustries']
    
    }

    this.subindustries = utilities.parseSubIndustries(this.companyProfile['industry']['subindustries'] , this.industryID);
                             
    this.hasAbout = this.companyProfile['is_about_us_set'];
    
  }

  updateData(items:IAbout){
    this.aboutUsContent = items; 

    /// Subindustries ///
    if(items.subindustries && items.subindustries.length > 0 ){
      this.subindustries = utilities.parseSubIndustries(items.subindustries , this.industryID);
    }else{
      this.subindustries = [];
    }
  
    this.hasAbout = true;
    this.modal.close();
    
  }

  open(edit?:boolean){
    
    edit ? this.modal.$title = this.translate.get('495') :
           this.modal.$title =  this.translate.get('35');
           
    this.modal.open();
  }
  openEmptyModal() {
    this.open( false );
  }
}
