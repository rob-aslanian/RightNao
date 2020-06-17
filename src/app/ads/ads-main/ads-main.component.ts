import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { adCategories, adFormats } from '../models/ads.model';
import { IAdsCategory, IAdsFormat } from 'src/app/_shared/models/ads/shared.interface';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { CategoryService } from './category.service';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';
import { Router } from '@angular/router';
import { AdvertFormatType } from 'src/app/_shared/models/ads/ads.type';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { AdsCreateService } from '../ads-create/ads-create.service';

@Component({
  selector: 'app-ads-main',
  templateUrl: './ads-main.component.html',
  styleUrls: ['./ads-main.component.scss']
})
export class AdsMainComponent implements OnInit {

  @ViewChild( AppModalComponent, { static: true } ) _modal: AppModalComponent;

  destroy$:Subject<any> = new Subject<any>();
  utils = utilities;

  adCategories:IAdsCategory[] = adCategories;
  adFormats = adFormats;
  formatsArray: IAdsFormat[] = [];
  selectedFormatsArray = [];

  activeCategory:string = '';
  acriveCategoryTitle = '';

  isCompany:boolean = false;

  modalList = [];
  listIndex;
  


  constructor(
    private globalService:GlobalUserProService,
    private categoryService: CategoryService,
    private adsService: AdsService,
    private adsCreateService: AdsCreateService,
    private route: Router
  ) {
    this.isCompany = this.globalService.isCompanyActive();
  }

  ngOnInit() {
    this.adsService.headerBtn.next({ type: 'manager', format: '' });
  }

  chooseCategory(category: IAdsCategory) {

    this.listIndex = null;
    this.modalList = [];

    this.selectedFormatsArray = [];

    if(!category.active) {
      this.route.navigate([`/comming_soon/${category['type']}`])
      return;
    }
    this.activeCategory = category['type'];
    this.acriveCategoryTitle = category['title'];

    this.switchCategory(this.activeCategory)

    this.formatsArray = [];
    category['formats'].forEach( format => this.formatsArray.push(this.adFormats[format]) );
    this.formatsArray.forEach(format => format.selected = false);
  }

  getSelectedFormats() {
    this.selectedFormatsArray = [];
    this.formatsArray.forEach((format) => {
      if(format.selected) {
        this.selectedFormatsArray.push(format.type);
      }
    })
  }

  generalFormat(format:AdvertFormatType) {
    if(this.activeCategory != 'banner') {
      return
    }
    this.adsService.input.formats = [];
    this.adsService.input.formats.push(format);
    this.adsService.input.type = this.activeCategory;
    this.adsCreateService.activeFormat = format.toLowerCase();
    this.adsCreateService.adsContentForm.reset();
    this.route.navigate(['/ads/location']);
  }


  switchCategory(value:string) {
    switch (value) {
      case 'candidate': this.selectCandidate();
        break;
        case 'professional': this.selectCandidate();
        break;
      case 'company': this.getAllCompany();
      
        break;
      case 'office': this.getAllOffice();
        break;
      case 'service': this.getAllServices();
        break;
      case 'job': this.getAllJobs();
        break;
      default:
        break;
    }
  }

  // radioTypeChange(id:string) {
    
  //   this.adsService.input.company_id = id;
  // }

  openModal() {
    this._modal.title = 'Ads';
    this._modal.open();
  };

  getModalListItem(e) {
    this.listIndex = e.target.value;

  }
  selectModalItem() {
    this.adsService.inputContent = {
      ...this.modalList[this.listIndex],
      type: this.activeCategory
    }
    this._modal.close();
  }
  

  getAllOffice() {
    this.categoryService
        .getVofficeheader()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          if(data.length) {
            let localLink = this.utils.getLocationLink;

            let userLink = this.isCompany ? `company/${this.categoryService.companyId}` : `user/${this.categoryService.user_id}`;
            
            
            this.modalList = data.map((office) => {
              return {
                id: office['id'],
                name: office['name'],
                url: `${localLink}/v-office/office/${office['id']}/${userLink}/overview/services`
              }
            });
            
            this.openModal();
          } else {
            this.route.navigate(['/v-office/open'])
          }
    })
  }

  getAllCompany() {
    this.categoryService
        .getAllCompany()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          if(data.length) {
            let localLink = this.utils.getLocationLink;
            
            this.modalList = data.map( (company) => {
              return {
                id: company['id'],
                name: company['name'],
                url: `${localLink}/company/profile/${company['url']}`
              }
            } );
            
            this.openModal();
          } else {
            this.route.navigate(['/registration/company'])
          }
          
        })
  }

  getAllJobs() {
    this.categoryService
        .getAllJobs()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          if(data.length) {
            let localLink = this.utils.getLocationLink;
            let company = this.globalService.getCompanyProfile();
            
            this.modalList = data.map( (job) => {
              return {
                id: job['id'],
                name: job['job_details']['title'],
                url: `${localLink}/company/profile/${company['url']}/jobs/${company['id']}?job_id=${job['id']}`
              }
            });
            
            this.openModal();
          }
        })
  }

  getAllServices() {
    this.categoryService
        .GetAllServices()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          if(data.length) {
            let localLink = this.utils.getLocationLink;

            let userLink = this.isCompany ? `company/${this.categoryService.companyId}` : `user/${this.categoryService.user_id}`;
            this.modalList = data.map( (service) => {
              return {
                id: service['id'],
                name: service['title'],
                url: `${localLink}/v-office/office/${service['officeID']}/${userLink}/overview/service/${service['id']}`
              }
            } );
            this.openModal();
          }
        })
  }

  selectCandidate() {
    let localLink = this.utils.getLocationLink;
    let user = this.globalService.getUserProfile();
    
    let candidate = {
      id: user['id'],
      name: user['name'],
      url: `${localLink}/user/profile/${user['url']}`,
      type: this.activeCategory,
      // content: {
      //   headline: user['name'],
      //   custom_button: 'Follow',
      //   description: user['id'],
      //   url: user['avatar']
      // }
    }
    this.adsService.inputContent = candidate;
  }

  next() {
    // || !this.adsService.input.company_id
    // if(!this.selectedFormatsArray.length || !this.adsService.inputContent['id']) {
    //   return;
    // }
    this.adsService.input.formats = this.selectedFormatsArray;
    this.adsService.input.type = this.activeCategory;
    this.route.navigate(['/ads/location'])
  }

  clearAllInputs() {
    this.activeCategory = '';
    this.selectedFormatsArray = [];
  }

  
}
