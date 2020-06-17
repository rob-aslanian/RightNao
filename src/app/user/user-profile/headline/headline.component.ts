import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { ProfileLangsService } from 'src/app/_shared/services/shared/profile-langs.service';


@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnInit {
 @Input() data;

 @Output() result:EventEmitter<string> = new EventEmitter<string>();

 editHeadlineForm: FormGroup;
 submittedHeadline:boolean = false;
 utils = utilities;
 selectedLang: string;

   
  userInfo: {
    firstname: string,
    lastname:  string,
    headline:  string,
    nickname:  string,
    story: string
  } = {

    firstname: '',
    lastname:  '',
    headline:  '',
    nickname:  '',
    story: ''

  };

 
  constructor(
       private fb:FormBuilder,
       private userProfileService:UserProfileService,
       private globalUserProService: GlobalUserProService,
       private langService:    ProfileLangsService

  ) {
    this.editHeadlineForm = this.fb.group({
      headline: [""]
    });


   }

  ngOnInit() {
     if(this.data){
       this.selectedLang = this.globalUserProService.getLanguage();
              
          this.editHeadlineForm.get('headline').setValue(this.data.headline);

     }
  }
  changeHeadline(){

   


    let text = this.editHeadlineForm.get('headline').value;
    this.submittedHeadline = true;

    if(this.editHeadlineForm.invalid){
     return ;

    }

    if( this.selectedLang === 'en' ) {
        this.userProfileService.changeHeadline(text)
        .subscribe(data => console.log(data));  

    } else {

          
        this.userInfo = {
            firstname: this.data.firstname,
            headline:  text,
            lastname:  this.data.lastname,
            nickname:  this.data.nickname, 
            story:     this.data.story 
        };
      

        this.langService
         .SaveProfileTranslation(
           this.selectedLang,
           this.userInfo
         ).subscribe()
         
         
    } 
    this.result.emit(text);
  }


}
