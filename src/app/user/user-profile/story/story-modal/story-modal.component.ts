import { Component, OnInit, Input,OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {PasswordValidation} from '../../../../_shared/register.validator';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { ProfileLangsService } from 'src/app/_shared/services/shared/profile-langs.service';


@Component({
  selector: 'app-story-modal',
  templateUrl: './story-modal.component.html',
  styleUrls: ['./story-modal.component.scss']
})
export class StoryModalComponent implements OnInit , OnDestroy{

 $destroy:Subject<any> = new Subject<any>()

 @Input() data: any;
 @Input() userInfo;
 @Output() result:EventEmitter<string> = new EventEmitter<string>();


 editStoryForm: FormGroup;
 stroySubmited: boolean = false;
 utils = utilities;
 selectedLang: any;

 
  constructor(

     private fb:             FormBuilder,
     private userService:    UserProfileService,
     private storageService: GlobalUserProService,
     private langService:    ProfileLangsService,
 
  ) { 

    this.editStoryForm = this.fb.group({
      story: [""]
    });


  }

  ngOnInit() {    
    
    this.selectedLang = this.storageService.getLanguage();

    if(this.data){
      console.log(this.data);
      
      this.editStoryForm.get('story')
      .patchValue(this.data);

    }
  
  }
   get st(){
      return this.editStoryForm.controls

   }
   changeStory(){
 
     
     this.stroySubmited = true;
     if(this.editStoryForm.invalid){
       return;

     }
      let text = this.editStoryForm.get('story').value.trim();
     if( this.selectedLang === 'en' ) {

       this.userService.changeStory(text)
        .pipe(takeUntil(this.$destroy))
         .subscribe( data => console.log(data));
           this.result.emit(
                text,       
           );
     } else {
        this.langService
        .SaveProfileTranslation( this.selectedLang, {
            ...this.userInfo,
            story: text
        }).subscribe( data => {
           this.result.emit(
              text,       
          );
        });
         
     }

 }
 ngOnDestroy(){
      this.$destroy.next();
      this.$destroy.complete(); 
 }
}
