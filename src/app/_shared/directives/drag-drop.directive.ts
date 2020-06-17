import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @Output() fileDroped:EventEmitter<any> = new EventEmitter<any>(); 

  constructor() { }

  @HostListener("dragover" , ["$event"]) public dargOver(e:Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener("dragleave" , ["$event"]) public dragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  @HostListener("drop" , ["$event"]) public drop(e) {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;

    if ( files.length > 0 ) {
      this.fileDroped.emit(files)
    }
    
  }

}
