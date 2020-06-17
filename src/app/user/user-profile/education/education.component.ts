import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IEducation } from 'src/app/_shared/models/user/education.interface';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal: AppModalComponent;

  private _educations: any;

  isMe: boolean;
  startPage: number = 2;
  modalType: string = null;
  photo: string = '';

  editContent:IEducation;

  utils = utilities;

  @Input() 
          set educations(value:IEducation[]){
            if(value){
              this._educations = value['educations'];
              this.isMe = value['me'];
            }
          }

  get educations():IEducation[]{
    return this._educations;
  }
  

  getLink(link:any){
    const url = link.address  ?  link.address :  link.url;
    return utilities.getUrl(url);
  }

  constructor(
    
     private translate: TranslateService

  ) { }

  ngOnInit() {
    console.log(this.isMe);
    
  }

  getData(education:IEducation){

    if(education){
      let { _type , _close} = education,
          educationIndex = this.educations.findIndex(ed => ed.id === education.id);

      
      switch(_type){
        case'add':{
          this.educations.unshift(education);
          break;
        }
        case'edit':{
          this.educations[educationIndex] = education;  
          break;
        }
        case'delete':{
          this.educations.splice(educationIndex , 1);
          break;
        }
        default: break;
      }

      _close ? this.modal.close() : null;
    }
  }

  open(edit?:boolean, content?:IEducation){
    console.log(edit);
    
    if(edit){
      this.modal.title = 'Edit Education'; 
      this.modalType = 'edit'; 
      this.editContent = content;
    
    }else{     
      this.modal.$title = this.translate.get('66');  
      this.modalType = 'add';    
    }    
  
    this.modal.open();   
  }   
  
  openEmptyModal() {
    this.open( false );
  }
} 
