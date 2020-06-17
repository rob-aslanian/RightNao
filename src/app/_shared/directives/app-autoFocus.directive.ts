import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appAutoFocus]'
})
export class AppAutoFocusDirective implements OnInit {
    constructor(private el: ElementRef) {}
    ngOnInit () {
        this.el.nativeElement.focus();
    }

}