import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';


@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.scss' , '../../_shared/css/registration_shared_styles.scss']
})
export class UserLoginPageComponent implements OnInit {

  type : string = "user";

  constructor(
    private router:Router,
    private activeRoute:ActivatedRoute,
    private globalService:GlobalUserProService,
  ) { }

  ngOnInit() {
  
    this.type =  this.activeRoute
                     .snapshot.queryParams['type'] ? 
                    this.activeRoute.snapshot.queryParams['type'] : 'user'



    

    if (this.globalService.isAuthenticated()) {
      return this.router.navigate(['/landing' ]);
    }
  }

  redirect(){
    this.type === 'user' ?  this.router.navigate(['/landing']) :
                            this.router.navigate(['/registration/login_company'])

  }

}
