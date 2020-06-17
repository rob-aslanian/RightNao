import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { AppModalComponent } from '../app-modal/app-modal.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;
  
  modalType:string = null;

  constructor(
    public translate:TranslateService,
    private global:GlobalUserProService,
    @Inject(DOCUMENT) private document:Document
  ) { }

  ngOnInit() {
  }
  
  changeLanguge(lang:string = 'en'){
    
    this.global.setInterfaceLang(lang);

    lang === 'ar' ? this.document.body.classList.add('dr') :
                    this.document.body.classList.remove('dr');
    
    return this.translate.use(lang);
  }


  get jobsLink() : string {
    let isCompany = this.global.isCompanyActive(),
        isAuth    = this.global.isAuthenticated();


    return !isAuth || !isCompany ? '/jobs/user' : '/jobs/company';
  }

  get isCompany() : boolean {
    return !this.global.isAuthenticated() || this.global.isCompanyActive();
  }

  open(){
    this.modalType = 'hiring';
    this.modal.open();
    this.modal.title = 'Post a job';
    return false;
  }

  trackByFn =  (index) => index;


  get postJobLink() : string | void {
     let isCompany = this.global.isCompanyActive(),
          isAuth   = this.global.isAuthenticated();

     return !isAuth && !isCompany ? '/registration/user' : '/jobs/company/post-a-job';
  }

}
