import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccomplishmentService } from '../../../_shared/services/accomplishment.service';
import { IAccomplishents } from 'src/app/_shared/models/user/accomplishment.interface';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-accomplishment',
  templateUrl: './accomplishment.component.html',
  styleUrls: ['./accomplishment.component.scss'],

})
export class AccomplishmentComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent; 

  private  _data: any;

  @Input() 
        set data(value) {
            this._data = value;

            this.isCurrent = value['isAdmin'];

            if(this.data){
              this.accompData = value['accomplishments'];
            }
        };
        get data(){
          return this._data;
        }

  accomplishmentForm: FormGroup;
  selectedType: string = null;
  startPage: number = 2;
  editableData: Object;
  accompData: IAccomplishents[];
  isCurrent:boolean = true;
  modalType:string;
  utils = utilities;


  constructor(
    private f: FormBuilder,
    private accompService: AccomplishmentService,
    private translate : TranslateService
  ) {
 
    this.accomplishmentForm = f.group({
      accomp: [null, Validators.required],
    })
  }

  ngOnInit() {

  }

  getLink(link:any){
    const url = link.address  ?  link.address :  link.url;
    return utilities.getUrl(url);
  }
  

  getTitle( type ) : string{
    return this.utils.getUserProfileText('accomplishments' , this.selectedType)[type];
  }

  open(isEdit?:boolean , content?:IAccomplishents) {
    this.modal.open();
    
    /// Edit
    if(isEdit){
      this.selectedType = content.__typename.toLowerCase();
      this.modal.$title =  this.translate.get(  this.getTitle('translateKeyEdit') );
      this.modalType = 'edit';
      this.editableData = content;
    }
    /// Add modal
    else{
      this.modal.$title = this.translate.get('58');
      this.modalType = 'add';
    }
  }


  selectType() {
    let form = this.accomplishmentForm;
    if (form.valid) {
      this.selectedType = form.controls['accomp'].value;
      this.modal.$title =  this.translate.get( this.getTitle('translateKey') );
    }

  }

  getResult(accomplishment:IAccomplishents){
    let { _close , _type , id } = accomplishment,
        indexOfAccomp = this.accompData.findIndex(accomp => accomp.id === id);

 
      
    _close ? this.modal.close() : null;

    switch(_type){
      /// Add
      case'add':{
        this.accompData.unshift(accomplishment);
        break;
      }
      /// Edit
      case'edit':{

        
        this.accompData[indexOfAccomp] = accomplishment;
        break;
      }
      /// Delete
      case'delete':{
        this.accompData.splice(indexOfAccomp , 1);
        break;
      }

      default:break;

    }

  }
  
  openEmptyModal() {
    this.open( false );
  }

}
