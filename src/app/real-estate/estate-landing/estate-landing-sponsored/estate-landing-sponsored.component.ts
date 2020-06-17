import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { SliderBadBoyEditionComponent } from './../../../_shared/shared/classified-ads/components/slider-bad-boy-edition/slider-bad-boy-edition.component';
 

@Component({
  selector: 'app-estate-landing-sponsored',
  templateUrl: './estate-landing-sponsored.component.html', 
  styleUrls: ['./estate-landing-sponsored.component.scss']
})

export class EstateLandingSponsoredComponent implements OnInit {
  
  @ViewChild( SliderBadBoyEditionComponent, { static: false } ) _slider: SliderBadBoyEditionComponent;

  @Input() 
    homies: any;

  constructor(  ) { }

  ngOnInit() { };
 
  rotateLeft() { 
    this._slider.back();
  
    
   };

  rotateRight() {
    this._slider.next();
  };

}
