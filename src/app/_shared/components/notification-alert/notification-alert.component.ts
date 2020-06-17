import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationText } from './notification.model';

@Component({
  selector: 'app-notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.scss']
})
export class NotificationAlertComponent implements OnInit {

  private _data;

  texts = NotificationText;


  @Output() close:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() type:string = 'founder';

  @Input()
        set data(value){
          this.show = true;
          this._data = value;
          

          setTimeout(() => {
            this.show = false;
            this.close.emit(false)
          }, 4000)
        };

        get data(){
          return this._data;
        }

  show:boolean = true;

  constructor() { }

  ngOnInit() {}



}
