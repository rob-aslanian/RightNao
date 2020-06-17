import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserAccountService } from 'src/app/_shared/services/user/user-account.service';
import { ISessions } from '../privacies';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.scss']
})
export class UserSessionComponent implements OnInit,OnDestroy {

 userAcountSession:ISessions[] = [];
 userAccountResult:ISessions[] = [];
 getCountryName = utilities.getCountryName;
 after:number = 0;
 utils = utilities;
 $destroy:Subject<any> = new Subject<any>();

  constructor(
       public userAccount:UserAccountService

  ) { }
  
  ngOnInit() {

         this
         .userAccount
         .getAccountSessions()  
         .subscribe(({data}) => {  

          this.userAcountSession =   data['getAccount']['sessions']

         }
   )
  }

  signOutFromSession(session,i):void{

    this.userAccount
    .signOutFromSessions(session.id)
    .pipe(takeUntil(this.$destroy))
     .subscribe( data => {
          this.userAcountSession.splice(i,1)
           
          
     })
  
  }
     showMore():void{
       this.after = this.after + 4;
       
           this.userAccount
             .getAccountSessions(this.after)
               .subscribe(({data}) => {                    
                    this.userAcountSession.push(...data['getAccount']['sessions'])
               });

     }
     signOutFromAllSessions():void{
            this.userAccount
              .signOutAllSessions()
               .pipe(takeUntil(this.$destroy))
                .subscribe(data => {
                    this.userAcountSession =   this.userAcountSession
                          .filter( session => {
                                  return    session.current_session 
                          } )
                      
                })
                
          


     }
     ngOnDestroy(){
        this.$destroy.next();
        this.$destroy.complete();

     }
 
}
