import { Component, OnInit } from '@angular/core';
import { AdsCreateService } from '../ads-create/ads-create.service';

@Component({
  selector: 'app-ads-preview',
  templateUrl: './ads-preview.component.html',
  styleUrls: ['./ads-preview.component.scss']
})
export class AdsPreviewComponent implements OnInit {
  activeFormat = '';
  src;

  constructor(
    private adsCreateService: AdsCreateService
  ) { }

  ngOnInit() {
    console.log('format', this.adsCreateService.activeFormat);
    
    this.activeFormat = this.adsCreateService.activeFormat;
    this.showImage();
  }

  showImage() {
    this.adsCreateService.adsContent
    .subscribe( ( resp ) => {
        this.src = resp['image'];
    })
    this.activeFormat = this.adsCreateService.activeFormat;
  }

}
