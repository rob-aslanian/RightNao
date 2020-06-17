import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {



 @Input() set data ( value ) {   
    this._data = value;
 } ;

 @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent

  modalType: string;
  editStory: any;
  _data:any;
  userInfo: {
    firstname: string,
    lastname:  string,
    headline:  string,
    nickname:  string
  } = {

    firstname: '',
    lastname:  '',
    headline:  '',
    nickname:  ''

  };


  constructor(
     private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  openStoryModal(){
  
    this._modal.open();
    this._modal.$title  = this.translate.get('91');
    this.modalType = 'add';
    this.editStory = this._data.story;

    this.userInfo = {
      firstname: this._data.firstname,
      headline:  this._data.lastname,
      lastname:  this._data.lastname,
      nickname:  this._data.nickname,  
    };
   
  }
  getStory(story){
             this._data.story = story;
             this._modal.close();
  }

  openEmptyModal() {
     this.openStoryModal();
  }
}
