import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IAward, IAwards } from 'src/app/_shared/models/company/awards.interface';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  private _data;

  awards:IAward[];
  isAdmin:boolean = false;

  startPage:number = 2;
  modalType:string = null;
  editableData:IAward;

  utils = utilities;

  @Input()
          set data(value:IAwards){
            this._data = value;
            this.awards = value['awards'];  
            this.isAdmin = value['isAdmin'];
            
          }

          get data() : IAwards{
            return this._data;
          }

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {

    
  }
  trackByFn(index , item){
    return index;
  } 



  getLink(link:any) : string {
    const url = link.address  ?  link.address :  link.url;

    return !url  ? null : utilities.getUrl(url);

  }


  getAward(award:IAward){
    let { _close , _type , id } = award,
    indexOfAward = this.awards.findIndex(ml => ml.id === id);


    _close ? this.modal.close() : null;

    switch(_type){
      /// Add
      case'add':{
        this.awards.unshift(award);
        break;
      }
      /// Edit
      case'edit':{
        this.awards[indexOfAward] = award;
        break;
      }
      /// Delete
      case'delete':{
        this.awards.splice(indexOfAward , 1);
        break;
      }

      default:break;

    }
  }

  open(isEdit?:boolean , content?:IAward){

    this.modal.open();
    
    /// Edit
    if(isEdit){
      this.modal.$title = this.translate.get('204');
      this.modalType = 'edit';
      this.editableData = content;
    }
    /// Add modal
    else{
      this.modal.$title = this.translate.get('62');
      this.modalType = 'add';
    }
  }
  openEmptyModal() {
    this.open( false );
  }
}
