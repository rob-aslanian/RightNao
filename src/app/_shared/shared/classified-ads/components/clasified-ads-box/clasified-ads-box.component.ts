import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-clasified-ads-box',
  templateUrl: './clasified-ads-box.component.html',
  styleUrls: ['./clasified-ads-box.component.scss']
})

export class ClasifiedAdsBoxComponent {

  @Input() isManage:boolean = false;

  @Input() box: any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
      console.log(this.box);
      
  }

  emit(id: string, has_liked: boolean){
    this.box.has_liked =  !this.box.has_liked;
    this.notify
        .emit({id, has_liked });
  }

  manage(id:string, action:string, status?:string){
    this.notify.emit({id,action,status});
    console.log('dsaaaaaaaaaaaaaaaaaaaa')
  }

}
