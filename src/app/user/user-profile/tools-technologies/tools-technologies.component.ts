import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs/operators';
import { Observable } from 'rxjs';
 

@Component({
  selector: 'app-tools-technologies',
  templateUrl: './tools-technologies.component.html',
  styleUrls: ['./tools-technologies.component.scss']
})
export class ToolsTechnologiesComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  toolsTechnologiesList :any[]; 
  userUrl :string;
  isMe :boolean = false; 
  modalType :string = null; 
  startPage: number = 4;

  private _data; 
  
  @Input()
            set data(value){
            this.isMe = value['isMe'];       
            this.toolsTechnologiesList = value['toolsTechnologies']; 
            }
      
            get data(){
            return this._data;
            }

  constructor(
    private router :ActivatedRoute,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.userUrl = this.router.snapshot.params['url'];
 
 
  }

  getTools(tools: any){
    if(tools){
      this.toolsTechnologiesList.unshift(...tools);
      this.modal.close();
    }else{
      this.modal.close();
    } 
 
    
  }

  setToolLevel(value:string){
    switch(value){
      case "Level_Begginer":{
        return "Begginer";
      }
      case "Level_Intermediate":{
        return "Intermediate";
      }
      case "Level_Advanced":{
        return "Advanced";
      }
      case "Level_Master":{
        return "Master"
      }
    }
  }

  getProgressBarPercentage(progress:string){
    switch(progress){
      case "Level_Begginer":{
        return 25
      }
      case "Level_Intermediate":{
        return 50
      }
      case "Level_Advanced":{
        return 75
      }
      case "Level_Master":{
        return 100
      }
    }
  }

  openModal(){
   const title: Observable<string> =   this.translateService.get('57').pipe(
                                                                       merge(
                                                                         this.translateService.get('547')
                                                                       ));

      this.modalType = "add"; 
      this.modal.$title = title; 
      this.modal.open();
    }
  
  openEdit() {
    const title: Observable<string> =   this.translateService.get('494').pipe(
                                                                         merge(
                                                                             this.translateService.get('547')
                                                                          ));

      this.modalType = "edit";
      this.modal.$title = title;
      this.modal.open();
  }
  openEmptyModal() {
     this.openModal();
  }
}
