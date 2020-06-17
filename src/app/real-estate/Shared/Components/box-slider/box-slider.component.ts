import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-box-slider',
  templateUrl: './box-slider.component.html',
  styleUrls: ['./box-slider.component.scss']
})
export class BoxSliderComponent implements OnInit {

 
  @Input() 
    slide: any;

  constructor() { }

  ngOnInit() {
      console.log(this.slide);
      
   }

}
