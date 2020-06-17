import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyAccountService } from 'src/app/_shared/services/companies/company-account.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-company-account-notifications',
  templateUrl: './company-account-notifications.component.html',
  styleUrls: ['./company-account-notifications.component.scss',  '../../../_shared/css/account_shared_style.scss']
})
export class CompanyAccountNotificationsComponent implements OnInit , OnDestroy{

  destroy$:Subject<any> = new Subject<any>();
  notificationForm: FormGroup;
  companyId:string;

  constructor(
    private f:FormBuilder,
    private comapnyService:CompanyAccountService,
    private globalUserService:GlobalUserProService
  ) {

    this.notificationForm = this.f.group({
      new_follow:[false],
      new_review:[false],
      new_applicant:[false]
    });
   }

  ngOnInit() {
    this.companyId = this.globalUserService.getComapnyId();

    this.notificationForm
        .valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            let keys = Object.keys(data),
                controls = this.notificationForm.controls;
                keys.map(key => {
                  if(controls[key].dirty ){
                    controls[key].markAsPristine();
                    this.comapnyService
                        .changeNotification(this.companyId, key , controls[key].value)
                        // .pipe(takeUntil(this.destroy$))
                        .subscribe(
                          () => {},
                          (err) => console.log(err)
                          
                        )
                  }
                })

          }
        )


    if(this.companyId){
      this.patchData();
    }
  }

  patchData() {
    this.comapnyService
        .getNotification(this.companyId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          ({data}) => {
            let notifications = data.getCompanyNotificationSettings,
                keys = Object.keys(notifications);

            keys.map(key => {
              if(this.notificationForm.get(key)){
                this.notificationForm.get(key).setValue(notifications[key]);
              }
            })
            
          }
        )
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();

  }

}
