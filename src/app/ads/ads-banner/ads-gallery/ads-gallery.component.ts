import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { AdsBannerService } from '../ads-banner.service';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-ads-gallery',
  templateUrl: './ads-gallery.component.html',
  styleUrls: ['./ads-gallery.component.scss']
})
export class AdsGalleryComponent implements OnInit {
  
  @Output() result:EventEmitter<any> = new EventEmitter<any>();
  
  modal:AppModalComponent;

  after:BehaviorSubject<string> = new BehaviorSubject<string>('0')
  first:number = 0;

  galleries:Observable<any>;
  amount:number;
  images:any[] = [];
  selectedImage;


  constructor(
    private adsBannerService:AdsBannerService,
    private adsService:AdsService
  ) { 
    this.amount = adsBannerService.amount;
    this.modal = adsBannerService.modal;
    this.modal.title = 'Gallery';
    this.modal.width = 497;
  }

  ngOnInit() {
    /// Get Gallery images 
    this.getGallery();

  }

  getGallery(){
    this.galleries = this.after
                         .pipe(
                          switchMap(() => this.adsService
                                              .GetAdvertGallery('12' , this.after.value)),
                          map(el => {
                            return this.amount > this.images.length ? this.images.push(...el['files']) : true;
                          }))
  }

  scroll(){

    
    if(this.first + 12 > this.amount){
      this.after.next(String(this.amount - 1));
    }
 
    if(this.first <= this.amount && this.first + 12 < this.amount){
      let next = this.first += 12;

      this.after.next(String(next));
    }  
  }

  trackByFn =  (index) => index;

  emitData(){
    this.result.emit(this.selectedImage);
  }

}
