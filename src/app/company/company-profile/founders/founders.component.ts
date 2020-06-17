import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IFounder, IFounders } from 'src/app/_shared/models/company/founders.interface';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-founders',
  templateUrl: './founders.component.html',
  styleUrls: ['./founders.component.scss']
})
export class FoundersComponent implements OnInit {


  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  private _data:IFounders;

  founders:IFounder[];
  isAdmin:boolean = false;
  modalType:string = null;
  startPage:number = 2;
  newFounder:IFounder;

  editableContent:IFounder;

  @Input() 
          set data(value:IFounders){
            this._data = value;
            this.founders = value['founders'];
            this.isAdmin = value['isAdmin'];
          }
          get data() : IFounders{
              return this._data;
          }
  constructor(
     private translate : TranslateService
  ) { }

  ngOnInit() {
    
  }


  open(isEdit?:boolean , content?:IFounder){

    this.modal.open();

    /// Edit
    if(isEdit){
      this.modal.$title = this.translate.get('641');
      this.modalType = 'edit';
      this.editableContent = content;
    }
    /// Add 
    else{
      this.modal.$title = this.translate.get('641');
      this.modalType = 'add'
    }
  }
  
  openEmptyModal() {
    this.open( false );
  }
 

  getFounder(founder:IFounder){
    let { _close , _type } = founder,
        founderIndexOf = this.founders.findIndex(found => found.id === founder.id);



    _close ? this.modal.close() : null;

    switch(_type){
      case'add':{
        this.newFounder = founder;
        this.founders.unshift(founder);
        break;
      }
      case'edit':{
        this.founders[founderIndexOf] = founder;
        break;
      }
      case'delete':{
        this.founders.splice(founderIndexOf , 1);
        break;
      }
      default:break;
    }
  }

}
