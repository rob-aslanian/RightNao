import { Component, OnInit, Input, HostListener, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './app-photo-modal.component.html',
  styleUrls: ['./app-photo-modal.component.scss']
})
export class AppPhotoModalComponent implements OnInit {

  @Output() onSrc: EventEmitter<any> = new EventEmitter<any>();

  @Input() src;

  @HostListener('document:keydown.escape' , ['$event']) escPress(e){
      e.preventDefault();
      return this.close()
  }

  isOpen:boolean = false;

  constructor() {}

  ngOnInit() {}

  close() {
      this.src = undefined;
      this.onSrc.emit();
  }
}
