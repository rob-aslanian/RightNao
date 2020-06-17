import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { IUserExperience, IAddExperience } from 'src/app/_shared/models/user/experience.interface';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal: AppModalComponent;
  photo: string = '';
  private _experiences: IUserExperience[] = [];

  isMe:boolean = false;
  startPage:number = 2;

  editExperience:IUserExperience;
  modalType:string = null;
  getCountryById = utilities.getCountryName;

  utils = utilities;
  
  @Input() 
          set experiences(value:IUserExperience[]){
            this._experiences = value['experiences'];
            this.isMe = value['me'];
          }

  get experiences() : IUserExperience[]{
    return this._experiences
  }

  getLink(link:any){
    const url = link.address  ?  link.address :  link.url;
    return utilities.getUrl(url);
  }

  constructor(
     private translate: TranslateService
  ) { }

  ngOnInit() {
       console.log( this._experiences );

   }
  

  open(edit?:boolean , data?:IUserExperience){
    
     if(edit){
       this.editExperience = data;
       this.modal.$title = this.translate.get('496');
       this.modalType = 'edit';
     }else{
       this.modal.$title = this.translate.get('69');
       this.modalType = 'add';
     }

     this.modal.open();
  }

  getExperience(experience:IUserExperience){

 
    if(experience){
      let { _close , _type , id} = experience,
          experienceIndex = this.experiences.findIndex(exp => exp.id === id);        
   
      switch(_type){
        case'add':{
          this.experiences.unshift(experience);
          break;
        }
        case'edit':{
            this.experiences[experienceIndex] = experience;
            break;
        }
        case'delete':{
            if(experienceIndex > -1){
               this.experiences.splice(experienceIndex , 1);
               break;
            }
            break;
        }
        default: break;

      }  
       _close ? this.modal.close() : null;
    }
    
  }
  
  openEmptyModal() {
     this.open( false );
  }
}
