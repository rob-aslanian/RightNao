import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyAccountService } from 'src/app/_shared/services/companies/company-account.service';
import { GlobalUserProService } from "../../../_shared/services/global-user-pro.service";
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-company-account-admins-manager',
  templateUrl: './company-account-admins-manager.component.html',
  styleUrls: ['./company-account-admins-manager.component.scss', '../../../_shared/css/account_shared_style.scss']
})

export class CompanyAccountAdminsManagerComponent implements OnInit {

   @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent
 
 
  companyId:string;
  companyAdmins:Array<any>;
   

   
  modalType: string;
  user: any;

  constructor(
   private   getCompanyIdService:GlobalUserProService,
   private   getCompanyService:CompanyAccountService
  ) {

 
   }
  
  ngOnInit() {

    this.companyId =  this.getCompanyIdService.getComapnyId()


      this.getCompanyService
       .getManageAdmins(this.companyId)
        .pipe( map(  ( { data  } )  => data['GetCompanyAdmins'] ) )
         .subscribe(data => this.companyAdmins = data );
  }

  addAdmin(){
     this._modal.open();
     this._modal.title = 'Add Company Admin';
     this.modalType = 'company';
 }

 close(event){
     if(event){
         this._modal.close()
     }
  }

  getResult(user){
      if(user._type === 'add'){
        this.companyAdmins.push({role:"role_admin",user});
      }
      else if(user._type ===  'delete'){
      let index =   this.companyAdmins.findIndex(data => data.user.id === user.id );
         this.companyAdmins.splice(index,1 );
         this._modal.close();
      }
  }
  deleteAdmin(user){
     this.user= user;
     this._modal.title = 'Delete Company Admin';
     this.modalType = 'deleteCompany';
     this._modal.open();
  }
}
