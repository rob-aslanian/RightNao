import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared-slider',
  templateUrl: './shared-slider.component.html',
  styleUrls: ['./shared-slider.component.scss']
})
export class SharedSliderComponent implements OnInit {

  selectedIndex: number = 0;
  
  primaryFile: string = '';

  @Input() files: string[] = [];

  @Input() type: string = 'Photo';
  
  @Input() hasSlides: boolean = true;
  
  open: string = '';

  constructor() { }

  ngOnInit() {
     if( this.files.length ) {      
        this.primaryFile = this.files[0];
     };
    
  }


  handleNextSlide() {
      this.selectedIndex++
      this.primaryFile = this.files[this.selectedIndex];    
  };
    
  handlePrevSlide() {
    this.selectedIndex--
    this.primaryFile = this.files[this.selectedIndex];
  };

  handleFileChanges( file: string, idx: number ) {
      this.primaryFile = file;
      this.selectedIndex = idx;
  };

  openModal( isClose ) {
     isClose ? this.open = '' :
      this.open = 'photo';
      
  }

}
