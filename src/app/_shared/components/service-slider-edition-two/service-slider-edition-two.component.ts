import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';


@Component({
  selector: 'app-service-slider-edition-two',
  templateUrl: './service-slider-edition-two.component.html',
  styleUrls: ['./service-slider-edition-two.component.scss']
})
export class ServiceSliderEditionTwoComponent implements OnInit {

  @Input() set files( value: any ) { 
      this.filesToShow = value;
      this.parseImages();
  };

  bigImage = '';
  selectedindex = 0;
  slider: any = [];
  filesToShow: any;

  constructor() { }

  ngOnInit() {

  }
  makeImageActive(i: number) {
    this.bigImage =   this.slider[i].address;
    this.selectedindex = i;
  }

  parseImages() {
    this.slider = this.filesToShow;
    this.bigImage = this.slider[0].address;
  }

  handleSlider( isNextSlide: boolean ) {   
      if( ( isNextSlide && this.selectedindex === ( this.slider.length - 1 ) ) || 
          ( !isNextSlide && !this.slider[this.selectedindex - 1] ) ) {
          // return to this first image
          if( isNextSlide )  this.selectedindex = -1;
          // return to this last image
          else this.selectedindex = this.slider.length;         
      }
      isNextSlide ? this.selectedindex++ : this.selectedindex--;     
      this.bigImage =   this.slider[this.selectedindex].address;
  }
}
