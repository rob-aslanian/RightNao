import { Component, OnInit, Input, ElementRef, ViewChild, TemplateRef, ViewChildren, QueryList } from '@angular/core';
import { IFile } from '../../models/files.interface';
import { utilities } from '../../utilities/utilities';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @ViewChild('sliderRow', { static: false }) sliderRow:ElementRef<HTMLElement>;
  @ViewChildren('activeContent') activeContent:QueryList<ElementRef<HTMLElement>>

  @Input() files:IFile[];

  activeIndex:number = 0;

  constructor(
   
  ) { }

  ngOnInit() {
    
  }

  get activeFile() : IFile {
    return this.files && this.files[this.activeIndex];
  }

  scroll(){
    this.activeContent.map((el , i) => {
      if(el && i === this.activeIndex ){  utilities.scrollIntoView(el.nativeElement) }
    })
  }


  next(e:MouseEvent){
    e.preventDefault();
    e.stopPropagation();

    if(this.activeIndex !== this.files.length -1) this.activeIndex++;
    else this.activeIndex = 0;

    this.scroll();

  }

  prev(e:MouseEvent){
    e.preventDefault();
    e.stopPropagation();

    if(this.activeIndex > 0) this.activeIndex--;
    else this.activeIndex = this.files.length - 1;

    this.scroll();

  }

  trackByFn(index){
    return index;
  }

  setActive(e:MouseEvent , idx:number){
    this.activeIndex = idx;
  }

}
