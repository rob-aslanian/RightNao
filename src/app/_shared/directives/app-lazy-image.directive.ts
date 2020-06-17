import { Directive, HostBinding, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAppLazyImage]'
})
export class AppLazyImageDirective {

  @HostBinding('attr.src') srcAttr = null;

  @Input() src:string;

  constructor(
    private el:ElementRef
  ) { }

  ngAfterViewInit(): void {
    return this.canLazyLoad() ?   this.lazyLoadImage() : this.loadImage();
  }


  public canLazyLoad(){
    return window && 'IntersectionObserver' in window;
  }

  public lazyLoadImage(){

    const obs = new IntersectionObserver((entries) => {
      entries.map(({ isIntersecting }) => {
         if(isIntersecting){
           this.loadImage();
           obs.unobserve(this.el.nativeElement);
         }
      })
    } , {
      root:null,
      rootMargin:'0px 0px 100px 0px',
      threshold:0
    })

    obs.observe(this.el.nativeElement);
  }

  public loadImage(){
    this.srcAttr = this.src;
  }

}
