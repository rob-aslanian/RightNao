import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { TranslateService } from '@ngx-translate/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';

@Component({
  selector: 'app-user-profile-landing-languages',
  templateUrl: './user-profile-landing-languages.component.html',
  styleUrls: ['./user-profile-landing-languages.component.scss']
})
export class UserProfileLandingLanguagesComponent implements OnInit {

@ViewChild(AppModalComponent, { static: true }) _modal: AppModalComponent; 

  languagesList: string[] = [];
  languagesToShowList: string[] = [];
  selectedIntLang: string;
  activeLanguageIndex = 0; 


  constructor(
    private trasnlateService: TranslateService,
    private globalService: GlobalUserProService

  ) { }
   
  ngOnInit() {
    
    this.selectedIntLang = this.globalService.getInterfaceLang(); 
    this.languagesList = this.trasnlateService.getLangs(); 
   
    this.toggleLanguage();

  }; 

  toggleLanguage(){
    this.languagesToShowList = [
      this.selectedIntLang, 
      this.selectedIntLang !== this.languagesList[0] ? this.languagesList[0] : this.languagesList[1],
      this.selectedIntLang !== this.languagesList[2] ? this.languagesList[2] : this.languagesList[1]
     ];
  }; 

  changeLanguage(language: string, index: number) { 
    this.activeLanguageIndex = index; 
    this.trasnlateService.use(language);
    this.globalService.setInterfaceLang(language);
    this.selectedIntLang = this.globalService.getInterfaceLang(); 

  };

  openModal() {
    this._modal.title = 'Select Language';
    this._modal.open();
  };
//  * $ *  Get Selected Language from modal * $ * 
  getSelectedLanguage(selectedLanguage: string) {
    if( selectedLanguage !== this.selectedIntLang && selectedLanguage ) {
        this.selectedIntLang = selectedLanguage;
        this.toggleLanguage();
        this.activeLanguageIndex = 0; 
    }
    this._modal.close();
  };




}
