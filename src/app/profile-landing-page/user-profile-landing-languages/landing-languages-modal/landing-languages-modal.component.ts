import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-languages-modal',
  templateUrl: './landing-languages-modal.component.html',
  styleUrls: ['./landing-languages-modal.component.scss']
})
export class LandingLanguagesModalComponent implements OnInit {

 @Input() languagesList: string[]; 
 @Input() selectedIntLang: string; 
 @Output() result = new EventEmitter<any>(); 

 languagesForm: FormGroup; 
 selectedLanguage: string;
 showSelectedLang: boolean = true;


  constructor(
    private globalService: GlobalUserProService,
    private translateService: TranslateService,
    private fb: FormBuilder
  ) { 

    this.languagesForm = this.fb.group({
      language: [ null, [ Validators.required ] ]

    }); 

  }

  ngOnInit() {
    
  }

  changeLanguage() {
    const selectedLanguage = this.languagesForm.value.language;

   if ( selectedLanguage ) {
     this.globalService.setInterfaceLang(selectedLanguage);  
     this.translateService.use(selectedLanguage); 
     this.result.emit(selectedLanguage); 
   } else {
     this.result.emit(false); 
   }
    
  }; 

  

  

  

}
