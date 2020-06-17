import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserProfileService } from "src/app/_shared/services/user/user-profile.service";
import { map, takeUntil } from "rxjs/operators";
import { ProfileStatisticService } from "src/app/_shared/services/statistic/profile-statistic.service";
import { UtilsService } from "src/app/_shared/services/shared/utils.service";
import { Observable, zip, Subject } from "rxjs";
import { GlobalUserProService } from "src/app/_shared/services/global-user-pro.service";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: [
    "./user-login.component.scss",
    "../../../_shared/css/registration_shared_styles.scss"
  ]
})
export class UserLoginComponent implements OnInit, OnDestroy {
  $destroy: Subject<any> = new Subject<any>();

  @Output() signed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() type:string = "user";

  loginForm: FormGroup;
  submitted = false;
  remember: any;
  tokenUser: any;
  isSelectUsers: boolean = false;
  selectedUser: number = 0;
  selected: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private globalUserProfileService: GlobalUserProService,
    private userService: UserProfileService,
    private statisticService: ProfileStatisticService,
    private utilService: UtilsService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      two_fa_code: [""],
      remember: [false]
    });
  }

  hide = true;
  error_server = "";

  ngOnInit() {
    
    if(this.savedUsers){
      if(this.savedUsers[this.selectedUser].password){
        let __password = atob(this.savedUsers[this.selectedUser].password);
        this.loginForm.get('password').setValue(__password);
      }
    }
    
  }

  get savedUsers() {
    return this.globalUserProfileService.getSavedUser();
  }

  getSelectedUser(e: number | boolean) {
    this.isSelectUsers = false;

    if (typeof e === "boolean") {
      this.selectedUser = -1;
      this.loginForm.reset();
    }

    if (typeof e === "number") {
      this.selectedUser = e;
      if(this.savedUsers[this.selectedUser].password){
        let __password = atob(this.savedUsers[e].password);
        this.loginForm.get('password').setValue(__password);
      }
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(event) {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.signIn();
    }
  }

  signIn() {
    let { username, remember } = this.loginForm.value;

    zip(this.Login(), this.getLocation())
      .pipe(
        takeUntil(this.$destroy),
        map(([login, country]) => {

          return {
            login: login["data"]["Login"],
            country: country["data"]["identifyCountry"]
          };
        })
      )
      .subscribe(
        ({ login, country }) => {
          this.userLoginStatistic(login);

    

          if (login.status == "not_activated") {
            this.router.navigate(["/registration/activation" , login.id]);
          } else {
            this.error_server = "";


            // Sets cookie token value and sets active profile as user
            if (
              this.globalUserProfileService.userLoggedIn(
                remember,
                login,
                country
              )
            ) {
              this.signed.emit(true);

              /// If checked remember
              if (remember) {

                this.globalUserProfileService.saveUser({
                  username:username.toLowerCase(),
                  password:btoa(this.loginForm.get('password').value),
                  lastVisit: new Date().getTime(),
                  ...login,
                  
                });
              }

              this.globalUserProfileService.updateSavedUser(login.id);


            }
          }
          // event.target.disabled = false;
        },
        err => {
          console.log(err);

          if (err.message.endsWith("wrong_2fa_code")) {
            this.selected = true;
          } else if ((err.type = "AuthError")) {
            this.error_server = "Wrong Login or Password.";
          }

          //event.target.disabled = false;
        }
      );
  }

  Login(): Observable<any> {
    let { username, password, two_fa_code } = this.loginForm.value;

    return this.userService.Login({
      login: username.toLowerCase(),
      password: password,
      two_fa_code: two_fa_code ? two_fa_code : ""
    });
  }

  getLocation(): Observable<any> {
    return this.utilService.getCurrentLocation();
  }

  userLoginStatistic(data) {
    this.statisticService
      .sentUserStatistic(
        {
          id: data.id,
          token: data.token,
          os: navigator.platform,
          timestamp: new Date().toISOString()
        },
        "signIn"
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
