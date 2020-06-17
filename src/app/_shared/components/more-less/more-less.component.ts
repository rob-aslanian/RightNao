import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-more-less',
  template:`
       <ng-container *ngIf="dataLength">
          <div class="d-flex justify-content-end" >
              <button class="backgroundless"  *ngIf="startPage < dataLength && !isShowMore" (click)="showMore()" >{{ '1305'| translate }}</button>
              <button class="backgroundless"  *ngIf="startPage > pageCount && isShowMore && dataLength > pageCount " (click)="showLess()" >{{ '1306'| translate }}</button>
          </div>
       </ng-container>
  `,
  styleUrls: ['./more-less.component.scss']
})

export class MoreLessComponent implements OnInit {

  @Input() dataLength:number;
  @Input() startPage:number = 2;

  @Output() start: EventEmitter<number> = new EventEmitter<number>();

  @Input() set isMultiply(value:object){

               if(value){   
                this.isShowMore = false;
                this.dataLength = value['dataLength']
                this.startPage  = value['startPage']   
               }

    }


  isShowMore:boolean = false;
  pageCount:number = 2;

  constructor() { }

  showMore(){    
    this.isShowMore = true;
    this.startPage = this.dataLength;
    this.start.emit(this.startPage);
  }

  showLess(){
    this.isShowMore = false;
    this.startPage = this.pageCount;
    this.start.emit(this.pageCount);
    
  }

  ngOnInit() {   
    this.pageCount = this.startPage;
  }

}
