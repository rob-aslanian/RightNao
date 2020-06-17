import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { IInterest, IInterests } from 'src/app/_shared/models/user/interest.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit , OnDestroy{
  src:string;
  private _interests:IInterests;
  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;


  @Input() 
          set data(value:IInterests){
              if(value){
                this.isAdmin = value.isAdmin;
                this._interests = value;
              }
          }
          get data() : IInterests{
            return this._interests;
          }

          
  modalType:string;
  startPage:number = 2;
  editableData:IInterest;
  isAdmin:boolean = false;
  interestsList: any[] = []; 

  constructor(
     private translate: TranslateService
  ) { }

  ngOnInit() {
  //  this.interestsList = this.data.interests;
     
  }

  open(isEdit?:boolean , content?:IInterest){
    this.modal.open();
    /// Edit
    if(isEdit){
      this.modal.$title = this.translate.get('Interests');
      this.modalType = 'edit';
      this.editableData = content;
    }
    /// Add modal
    else{
      this.modal.$title = this.translate.get('72');
      this.modalType = 'add';
    }
  }

  getInterest(interest:IInterest){
    let { _close , _type , id, } = interest,
        indexOfInterest = this.data.interests.findIndex(ml => ml.id === id);
       
    _close ? this.modal.close() : null;

    switch(_type){
      /// Add
      case'add':{
        console.log(this.data.interests);
        
        this.data.interests.unshift(interest);
        break;
      }
      /// Edit
      case'edit':{
        this.data.interests[indexOfInterest] = interest;
        break;
      }
      /// Delete
      case'delete':{  
        this.data.interests.splice(indexOfInterest , 1);
        break;
      }

      default:break;

    }


  }

  ngOnDestroy() {
    this.modal.close();
  }
  openEmptyModal() {
     this.open( false );
  }

  showPhotoModal(e) 
  {
    this.src = e.target.src;
  }
}
