import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import * as XLSX from 'xlsx';
import { campaignStatus } from '../models/ads.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { AdsCreateService } from '../ads-create/ads-create.service';

type AOA = any[][];

@Component({
  selector: 'app-ads-manager',
  templateUrl: './ads-manager.component.html',
  styleUrls: ['./ads-manager.component.scss']
})
export class AdsManagerComponent implements OnInit  , OnDestroy{

  @ViewChild( AppModalComponent, { static: true } ) _modal: AppModalComponent;
  modalType = '';

  $destroy:Subject<any> = new Subject<any>();

  // data:AOA = [];
  ads:Observable<any>;
  amount:number;
  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  first:number = 20;
  page:number = 1;
  isLoading:boolean = true;
  selectedAd:{
    [id:number]:boolean
  } = {};
  isAllSelected:boolean = false;

  isCampaign:boolean = true;
  list = [];
  selectedList = [];
  campaignStatus = campaignStatus;
  campaignId = '';
  campaignInfo;
  activeCategory;

  constructor(
    private adsService:AdsService,
    private route: Router,
    private activeRoute:ActivatedRoute,
    private adsCreateService:AdsCreateService
  ) { }

  ngOnInit() {
    this.campaignId = this.activeRoute.snapshot.params['id'];
    let query = this.campaignId ? this.adsService.GetAdvertsByCampaignID( this.campaignId, this.first, this.after.value) : 
                                  this.adsService.GetAdvertCampaigns(this.first, this.after.value)
    
    this.after
              .pipe(
              switchMap(() => query))
              .subscribe( (data) => {
                
                this.amount = data['total_amount'];
                this.list = this.campaignId ? data['adverts'].map(item => { return {...item, isSelected: false} }) : 
                                              data['campaings'].map(item => { return {...item, isSelected: false} });
                this.campaignInfo = this.campaignId ? data['capmaign'] : undefined;

                let headerBtn = {
                  type: this.campaignId ? this.campaignInfo.id : 'campaign',
                  format: this.campaignId ? this.campaignInfo.format['0'] : '' 
                }
                this.adsService.headerBtn.next(headerBtn);
              })

              
              
    
  }
  showAdverts(id,advert?) {
    if(!this.campaignId) {
      this.route.navigate([`/ads/manager/${id}`])
      return
    } else if (this.campaignInfo.type!='banner') {
      return
    }
    this.adsCreateService.activeFormat = this.campaignInfo.format['0'].toLowerCase();
    let content = {};
    if(this.adsCreateService.activeFormat != 'carousel') {
      content = {
        line: advert['contents']['0']['title'],
        btn: advert['contents']['0']['custom_button'],
        description: advert['contents']['0']['description'],
        image: advert['files']['0'] ? `/file/${advert['files']['0']['address']}` : ''
      }
    } else {
      content = {
        cards: advert.contents.map( (elem, index) => {
          return {
            headline: elem['title'],
            image: `/file/${advert['files'][index]['address']}`
          }
        } )
      }
      
    }
    this.adsCreateService.adsContent.next(content);
    this._modal.title = 'General Ad';
    this.modalType = this.adsCreateService.activeFormat;
    this.openModal();
  }

  deactivate(item) {
    let mutate = this.campaignInfo ? this.adsService.pauseAdvert(item['id']) : 
                                      this.adsService.pauseAdvertCampaign(item['id']);

    mutate.subscribe( data => item['status'] = 'paused' )

  }

  remove(item) {
    let mutate = this.campaignInfo ? this.adsService.removeAdvert(this.campaignInfo['id'], item['id']) : 
                                      this.adsService.removeAdvertCampaign(item['id']);

    mutate.subscribe( data => this.list = this.list.filter( elem => elem != item ) )
  }

  activate(item) {
    let mutate  = this.campaignInfo ? this.adsService.activeAdvert(item['id']) :
                                      this.adsService.activeAdvertCampaign(item['id']);

    mutate.subscribe( data =>  item['status'] = 'active' )
  }

  duplicate(item) {
    let format = this.campaignInfo['format'][0].toLowerCase();
    console.log(format);
    
    // switch (key) {
    //   case value:
        
    //     break;
    
    //   default:
    //     break;
    // }

  }

  deleteSelected() {
    this.selectedList.forEach( elem => this.remove(elem) )
  }
  deactivateSelected() {
    this.selectedList.forEach( elem => this.deactivate(elem) )
  }

  selectively(status:string) {
    this.selectedList = [];
    switch (status) {
      case 'all': this.list.forEach((element) => {
        element.isSelected = true;
        this.selectedList.push(element)
      });
        break;
      case 'remove': this.list.forEach((element) => {
        element.isSelected = false;
      });
        break;
    
      default: this.list.forEach( (element) => {
        element.isSelected = false;
        if(element['status']==status) {
                  element.isSelected = 'true';
        this.selectedList.push(element);
        }
      });
        break;
    }
  }


  sortBy(status) {
    let sortedArray1 = [];
    let sortedArray2 = [];
    sortedArray1 = this.list.filter( elem =>  elem['status']==status )
    sortedArray2 = this.list.filter( elem =>  elem['status']!=status )
    this.list = sortedArray1.concat(sortedArray2);
  }


  checkAll(e:any) {
    let status = e.target.checked ? 'all' : 'remove';
    this.selectively(status);
    
    
  }




  





  openModal() {
    this._modal.open();
  };
  closeModal() {
    this._modal.close();
  }

  // toggleAll(e){
  //   let count = this.amount <= 20 ? 
  //               this.amount : 20;

  //   for(let i = 0 ; i < count; i++){
  //     this.selectedAd[i] = e.target.checked;

  //     (<HTMLElement>document.querySelectorAll('.chkbox')[i]).click()
  //   }
  // }



  // toggleAd(e:any , ads , idx:number){
  //   if(ads){
  //     let profile = ads.creator_profile,
  //        creator = `${profile.firstname} ${profile.lastname}`,
  //     ad = [
  //       ads.name,
  //       ads.id,
  //       ads.status,
  //       ads.start_date,
  //       ads.end_date,
  //       ads.budget,
  //       creator
  //     ];

  //     let index = this.data.findIndex((el) => el[1] === ads.id);

  //     this.selectedAd[idx] = e.target.checked;

  //     return e.target.checked ?  this.data.push(ad) : 
  //                                this.data.splice(index , 1);
  //   }

  //   return;
  // }

  // export(){
  //   const ws:XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
  //     ["Advertisment Name","ID" , "Status" , "Date" , "End Date" , "Budget" , "Created by" ],
  //     ...this.data
  //   ]);

  //   const wb:XLSX.WorkBook = XLSX.utils.book_new();

  //   XLSX.utils.book_append_sheet(wb,ws , 'test');


  //   XLSX.writeFile(wb , `ads_${new Date().toDateString()}.xlsx`);
  // }

  resestCheckboxes(){
    this.selectedAd = {};
    this.isAllSelected  = false;
    // this.data = [];
  }

  // preventDefault(e) {
  //   // e.preventDefault();
  //   e.stopPropagation();
  // }

    toggleAd(item){
      // item['isSelected'] = e.target.checked;
      if(item['isSelected']) {
        this.selectedList.push(item)
      } else {
        this.selectedList = this.selectedList.filter( el => el!=item )
      }
      
  }


  // activateAd(ad){

  //   if(!ad) return;

  //   let id = ad.id;

  //   this.adsService 
  //       .PublishAdvert(id)
  //       .pipe(takeUntil(this.$destroy))
  //       .subscribe(
  //         (_) => { ad.status = 'active'  }
  //       )
    
  // }

  // pauseAd(ad){
    
  //   if(!ad) return;

  //   let id = ad.id;

  //   this.adsService
  //       .PutAdvertOnPause(id)
  //       .pipe(takeUntil(this.$destroy))
  //       .subscribe(
  //         (_) => { ad.status = 'paused' }
  //       )
  // }

  // deleteAd(ad){
  //   if(!ad) return;

  //   let id = ad.id;

  //   this.adsService
  //       .RemoveAdvert(id)
  //       .pipe(takeUntil(this.$destroy))
  //       .subscribe(
  //         (_) => { ad.status = 'paused' }
  //       )
  // }

  trackByFn =  (index) => index;

  changePage(e){
    let page = e ===  1 ? 0 : 
               this.first * --e;
 
    this.after.next(String(page));
    this.resestCheckboxes();
     
   }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();

  }

}
