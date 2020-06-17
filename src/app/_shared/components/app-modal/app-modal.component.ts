import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, EMPTY } from 'rxjs';


@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss']
})
export class AppModalComponent implements OnInit {
  @ViewChild('appModal', { static: true }) modal: TemplateRef<any>;


  @Input() title: string;
  @Input() width:number | string = 597;
  @Input() size:string;

  @Input() type:string = "any";

  @Output() closeModal:EventEmitter<any> = new EventEmitter<any>();
  
  $title: Observable<string>;
  

 @Input() withoutContent: boolean = false;

 constructor(private modalService: NgbModal) { 
   
 }

  ngOnInit() {
  
   }
   
  @Input()  isBlue: boolean = true;

  
 showModal:boolean = true;

  public close(){
    this.modalService.dismissAll()
    this.closeModal.emit();
  }

  public open(){
    this.showModal = true;
   setTimeout(() => {
    // @ts-ignore
    this.modalService.open(this.modal, { size: this.size , backdrop:'static' }).result.then(
      (res) => {
   
      }, reason => {;
        this.close();
        this.title = '';
        this.$title = EMPTY;
        
      });
   });
  }


 
}
