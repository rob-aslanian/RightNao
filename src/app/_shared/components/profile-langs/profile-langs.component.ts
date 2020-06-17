import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AppModalComponent } from '../app-modal/app-modal.component';
import { IProfileTranslation } from '../../models/profile-langs/profileLangs.model';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { utilities } from '../../utilities/utilities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-langs',
  templateUrl: './profile-langs.component.html',
  styleUrls: ['./profile-langs.component.scss']
})
export class ProfileLangsComponent implements OnInit {
  
  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  @Input() data:IProfileTranslation;

  @Output() changeLanguage:EventEmitter<string> = new EventEmitter<string>();

  modalType:string;

  utils = utilities;

  isLanding: boolean; 
  isCompanyActive: boolean; 

  constructor(
    private globalService: GlobalUserProService,
    private router: Router, 
  ) { }

  ngOnInit() {
      this.isLanding = this.router.url.includes('landing'); 
      this.isCompanyActive = this.globalService.isCompanyActive(); 
      console.log(this.data);
      

  }

  trackByFn =  (index) => index;

  get hasPermission(){
    return this.globalService.getProfileId() === this.data.profileId;
  }

  get otherLang(){
    return this.data.langs.filter(lang => lang !== this.data.activeLang);
  }

  get currentLang(){
    return this.data.activeLang;
  }

  set currentLang(value){
    this.data.activeLang = value;
  }

  open(){
    this.modal.open();
    this.modalType = 'lang';
    this.modal.title = 'Create profile in another language';
  }

  selectLang(lang){
    this.modal.close();

    if(lang){
      this.currentLang = lang;
      this.globalService.setLanguage(lang); 
      return this.changeLanguage.emit(this.currentLang);
    }
    
  }

}
