import { Component, OnInit } from '@angular/core';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss' , '../../_shared/css/registration_shared_styles.scss']
})
export class WelcomeComponent implements OnInit {

  destroy$:Subject<any> = new Subject<any>();

  utils = utilities;
  code:FormControl;
  submited:boolean = false;
  userID:string;
  hasError:boolean = false;

  constructor(
    private activeRouter:ActivatedRoute,
    private utilService:UtilsService,
    private router:Router,
    private globalService:GlobalUserProService,
  ) {
    this.userID = activeRouter.snapshot.params['id'];
    this.code = new FormControl('' , Validators.required);


   }

  ngOnInit() {

  }

  submit(){
    this.submited = true;

    if ( this.code.valid && this.userID ) {
        this.hasError = false;
        this.utilService
            .ActivateUser(this.code.value , this.userID)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (data) => {
                this.globalService.userLoggedIn(false , data);
                
                setTimeout(() =>  this.router.navigate(['/landing']) , 400)
              },
              () => { this.hasError = true; }
            )
    }
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
