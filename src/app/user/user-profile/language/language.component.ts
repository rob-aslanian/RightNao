import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Ilanguage} from '../../../_shared/models/user/language.interface'; 
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {


  data;
  currentLangs:string[] = [];
  @Input() 
          set dataLanguage(value:Ilanguage[]){
             this.data = value;
             this.Languages = [ ...this.data.languages ];
          }

          get dataLanguage(){
            return this.data;
          }



  @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent
    
  modalType: string;
  editLanguage: Ilanguage;
  index: number;
  startPage:number = 2;
  Languages:Ilanguage[] = [];

  constructor(
    
  ) { 
  
  }

  ngOnInit() {
    
    this.setCurrentLanguages();
  } 


  setCurrentLanguages(){
    if(this.Languages) {
      if(this.Languages.length > 0) {
        this.currentLangs = this.Languages.map(el => el.language);
      }
    }
  }

  openLanguage(type, lang?:Ilanguage, i?: number ):void{

    if(type === 'save'){
      this._modal.open();
      this.modalType = "add";
      this._modal.title = 'Add Language';

    }

    else if(type === 'edit'){
      this._modal.open();
      this.modalType = "edit";
      this._modal.title = 'Edit Language'; 
      this.editLanguage = lang;
      this.index = i;

    }
    
  }
  getLanguage(lang){


   
    switch (lang._type) {
      case 'add':{
         this.Languages.unshift(lang);         
         this._modal.close();
        }
        break;
      case 'saveAndAdd':{
        this.Languages.unshift(lang);
       }
       break;
      case 'remove':{
          this.Languages.splice(this.index,1);
          this._modal.close();

       }
       break;
      case 'edit':{
         this.Languages[this.index].language = lang.language_id;
         this.Languages[this.index].rate = lang.rank;
         this._modal.close();
         
       }
       break;
    }

    this.setCurrentLanguages();
  }
  openEmptyModal() {
    this.openLanguage('save');
  }
}
