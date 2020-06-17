import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { distinctUntilChanged, map, filter, tap, debounceTime } from 'rxjs/operators';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  @Output() closeModal:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() result:EventEmitter<object> = new EventEmitter<Object>();
  @Input () companyId:string;
  @Input () companyAdmins;

  selectedUserW: Object;
  selectedData= null;
  addAdminForm:FormGroup
  hasError:boolean = false;

  constructor(
   private companyService:CompanyProfileService,
   private fb:FormBuilder
  ) {
      this.addAdminForm = this.fb.group({
       password:['',Validators.required]
      })
   }

  ngOnInit() {

  }
 
     get editInt() {
         return this.addAdminForm.controls;
     }

  searchUsers(e){
    let target =  e.target.value;
    if(target){
      this.selectedUserW  =  this.companyService.searchUsers(target).pipe(
             distinctUntilChanged(),
             debounceTime(200),
             map(({data}) =>  data['searchUsers']['profiles']),
             filter( _ => target.length > 2  ) 

        )
    }
  }
  selectedUser(user){

     this.selectedData = {
         avatar:user.avatar,
         firstname:user.firstname,
         lastname:user.lastname,
         id:user.id,
         experiences:user.experiences,
         skills:user.skills,
         _type:'add'
    };

    this.selectedUserW = null;

 }
 
 addAdmin(){
    this.hasError = false;
    let input = {
      company_id:this.companyId,
      user_id:this.selectedData.id,
      password:this.addAdminForm.controls.password.value,
      role:'role_admin'
    }
      
    this.companyService.addCompanyAdmin(input).subscribe(data => {
          if(data){
              this.result.emit(this.selectedData);
              this.closeModal.emit(true);
          }
    },
          error => {
            this.addAdminForm.reset()
            this.hasError = true;
          }
     );

   }
}
