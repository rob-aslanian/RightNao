import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IService, IServices } from 'src/app/_shared/models/company/services.interface';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  private _data;

  services:IService[];
  isAdmin:boolean = false;

  startPage:number = 2;
  modalType:string = null;
  editableData:IService;

  @Input()
          set data(value:IServices){
            this._data = value;
            this.services = value['services'];  
            this.isAdmin = value['isAdmin'];
          }

          get data() : IServices{
            return this._data;
          }

  constructor(
     private translate: TranslateService
  ) { }

  ngOnInit() {
  }


  getService(service:IService){
    let { _close , _type , id } = service,
    indexOfService = this.services.findIndex(ml => ml.id === id);


    _close ? this.modal.close() : null;

    switch(_type){
      /// Add
      case'add':{
        this.services.unshift(service);
        break;
      }
      /// Edit
      case'edit':{
        this.services[indexOfService] = service;
        break;
      }
      /// Delete
      case'delete':{
        this.services.splice(indexOfService , 1);
        break;
      }

      default:break;

    }
  }

  open(isEdit?:boolean , content?:IService){

    this.modal.open();
    
    /// Edit
    if(isEdit){
      this.modal.$title =  this.translate.get('1290');
      this.modalType = 'edit';
      this.editableData = content;
    }
    /// Add modal
    else{
      this.modal.$title =  this.translate.get('88'); 
      this.modalType = 'add';
    }
  }

  openEmptyModal() {
     this.open(false);
  }
}
