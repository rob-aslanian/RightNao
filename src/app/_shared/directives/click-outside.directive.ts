import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(
    private _elementRef:ElementRef
  ) { }

  @Output() appClickOutside:EventEmitter<boolean | MouseEvent> = new EventEmitter<boolean | MouseEvent>();

  @HostListener('document:click' , ['$event' , '$event.target']) 
    public onClick(e:MouseEvent , target:HTMLElement): void {
       if(!target) return;

       const clickInside = (<HTMLElement>this._elementRef.nativeElement).contains(target);
      
      if(!clickInside){
        this.appClickOutside.emit(clickInside); /// if outside 
      }
       
    }
}
