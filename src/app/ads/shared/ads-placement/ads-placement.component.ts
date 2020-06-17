import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { AdsType } from 'src/app/_shared/models/ads';

@Component({
  selector: 'app-ads-placement',
  templateUrl: './ads-placement.component.html',
  styleUrls: ['./ads-placement.component.scss']
})
export class AdsPlacementComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  @Input() type:AdsType;

  imgSrc:string;
  isOpen:boolean = true;

  constructor() { }

  ngOnInit() {
    this.imgSrc = `assets/img/ads/${this.type}.svg`;
  }


  open(){
    this.modal.open();
    this.modal.title = `${this.type} Ad Placement`;

  }

}
