import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { JobBenefits } from 'src/app/jobs/models/postJobmodels';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { IBenefit } from 'src/app/_shared/models/company/benefit.interface';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  private _data;

  @Input()
          set data(value:IBenefit){
            this._data = value;
            this.benefits = value['benefits'];  
            this.isAdmin = value['isAdmin'];
            this.companyId = value['companyId']

            if(this.benefits && this.benefits.length > 0){
              this.patchData();
            }
          }

          get data() : IBenefit{
            return this._data;
          }

  benefits:any[];
  isAdmin:boolean = false;
  companyId:string;
  
  constructor(
    private companyService:CompanyProfileService
  ) { }

  ngOnInit() {

  }

  patchData(){
    this.benefits = this.benefits.map(benefit => {
      return JobBenefits.filter(bn => bn.id === benefit)[0];
    }).filter( benefit => benefit );

 
    
    
  }

  open(type:string){
    this.modal.open();
    this.modal.title = `${type} Employee Benefits`;
  }

  openEmptyModal() {
     this.open('Add');
  }

  getBenefits(benefits:any[]){
    this.benefits = benefits;
    this.modal.close();

    if(this.benefits){
      this.companyService
          .ChangeCompanyBenefits(this.companyId , this.benefits.map(bn => bn.id))
          .subscribe(
            (data) => {

            }
          )
    }
  }
}
