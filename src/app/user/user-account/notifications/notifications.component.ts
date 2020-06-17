import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { graphqlUserAccount } from '../../../_shared/graphql/user-account';
import { UserAccountService } from 'src/app/_shared/services/user/user-account.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss', '../../../_shared/css/account_shared_style.scss' ]
})
export class NotificationsComponent implements OnInit , OnDestroy{

  destroy$:Subject<any> = new Subject<any>();

  //  formgroups
  notificationsForms: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService:UserAccountService
  ) { 
    
    this.notificationsForms = this.fb.group({
      new_connection: [false],
      accept_invitation: [''],
      new_follow: [false],
      new_chat_message: [''],
      birthdays: [''],
      new_endorsement: [false],
      email_updates: [''],
      job_changes_in_network: [''],
      import_contacts_joined: [''],
      job_recommendations: [''],
      new_recommendation:[false],
      recommendation_request:[false],
      job_invitation:[false],
      approved_connection:[false]
    });

  }

  ngOnInit() {
  
    this.notificationsForms
        .valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            let keys = Object.keys(data),
                controls = this.notificationsForms.controls;
                keys.map(key => {
                  if(controls[key].dirty ){
                    controls[key].markAsPristine();
                    this.userService
                        .changeNotification(key , controls[key].value)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(
                          () => {},
                          (err) => console.log(err)
                          
                        )
                  }
                })

          }
        )

      this.patchData();
  }

  patchData() {
 
    
    this.userService
        .getNotification()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          ({data}) => {
            let notifications = data.getNotificationSettings,
                keys = Object.keys(notifications);

            keys.map(key => {
              if(this.notificationsForms.get(key)){
                this.notificationsForms.get(key).setValue(notifications[key]);
                 
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
