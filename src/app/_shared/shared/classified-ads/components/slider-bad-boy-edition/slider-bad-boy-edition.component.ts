import { Component, 
         OnInit, 
         ViewChild, 
         ElementRef,  
         AfterViewInit,
         Input
      } from '@angular/core';

@Component({
  selector: 'app-slider-bad-boy-edition',
  templateUrl: './slider-bad-boy-edition.component.html',
  styleUrls: ['./slider-bad-boy-edition.component.scss']
})
export class SliderBadBoyEditionComponent implements AfterViewInit {

  @ViewChild('container', { static: false }) container: ElementRef<HTMLInputElement>;

  position = 0;
  
  amountOfSlides: number = 0;
  
  maximumSteps: number = 0;
  
  counter: number = 0;

  @Input() amount: number = 0;

  constructor() { };


  ngAfterViewInit(): void {

     this.amountOfSlides = this.container
                               .nativeElement.childNodes[0].childNodes.length;  
 
     this.maximumSteps = Math.ceil( ( this.amountOfSlides / this.amount ));
      
  }
  

  next() {    
 
    this.counter++;         
    if( this.counter === this.maximumSteps ) {
         // Reset properties to default value 
         this.counter = 0;
         this.position = 0;
         return this.container.nativeElement
                    .style.transform = `translate(0px, 0px)`;
    };
    
    this.position = this.position - this.container.nativeElement.childNodes[0]['clientWidth'];
    this.setPosition( this.position );
 
    
  };

  getWIdth() {
      return this.container.nativeElement.childNodes[0]['clientWidth'];
  }


  back() {
    if( this.position == 0 ) {
        return;
    };

    this.counter--;

    this.position = this.position + this.container.nativeElement.childNodes[0]['clientWidth'];
    this.setPosition( this.position );
  };

  setPosition = ( position: number  ) => this.container.nativeElement
                                             .style.transform = `translate(${position}px, 0px)`; 
};
