import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators, Form } from '@angular/forms';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { ProfileLangsService } from 'src/app/_shared/services/shared/profile-langs.service';


@Component({
  selector: 'app-tools-technologies-modal',
  templateUrl: './tools-technologies-modal.component.html',
  styleUrls: ['./tools-technologies-modal.component.scss']
})
export class ToolsTechnologiesModalComponent implements OnInit {

  $destroy:Subject<any> = new Subject<any>();

  toolsTechnologiesList: any[];
  addedToolsList: any[] = []; 
  toolsForm: FormGroup;
  sameTool: boolean = false; 
  utils = utilities;
  submitted = false;

  private _data :any[];
  @Input() 
          set getData(data){
            this.toolsTechnologiesList = data;
          }
          get getData(){
            return this._data 
          }

  @Input() modalType :string;
  @Output() result: EventEmitter<any> = new EventEmitter<any>(); 
 

  constructor(
    private userProfileService :UserProfileService,
    private fb :FormBuilder,
 
  ) {  
    this.toolsForm = this.fb.group({
      tool_Technology: ['', Validators.required],
      rank: this.fb.array(['', Validators.required])
    })
   }


   get rankCtrls(): FormArray {
       return this.toolsForm.get('rank') as FormArray;
   }

  ngOnInit() { 
 
  }


  // *** Add Tools & Technologies ***

  onSelect(e :any, index :number){
      if(e){
        this.addedToolsList[index].rank = e;
        this.toolsTechnologiesList.map(tool => {
        this.addedToolsList[index].tool_Technology === tool.tool_Technology ? tool.rank = e : ''; 
        })
      } 
    }


    deleteTool(index:number){
      this.addedToolsList.splice(index, 1);     
    }


  submit(): void{
      if(this.checkToolsFormToSubmit()){
        this.addedToolsList.push({
          tool_Technology:this.toolsForm.get('tool_Technology').value,
          rank: ''
          })
        this.toolsForm.get("tool_Technology").setValue("");
      }

    }


  saveOnAdd(){
    this.submitted = true;
    const ranksList = this.addedToolsList.map(tool => tool.rank !== "");
    
    if(!ranksList.includes(false)){
        this.addToolTechnology(this.addedToolsList); 
    }
  }

  // *** Check if Tool is not empty null or same tool ***
  checkToolsFormToSubmit(): boolean{     
    const toolsFromDB = this.toolsTechnologiesList.map( tool => tool.tool_Technology.toLowerCase()); 
    const addedTools = this.addedToolsList.map( tool => tool.tool_Technology.toLowerCase()); 

    if(this.toolsForm.value.tool_Technology !== null){     
      if(this.toolsForm.value.tool_Technology.trim() !== ""){
        if( !toolsFromDB.includes(this.toolsForm.value.tool_Technology.trim().toLowerCase()) 
        && !addedTools.includes(this.toolsForm.value.tool_Technology.trim().toLowerCase())){
            this.sameTool = false;
            return true  
        }else{
          this.sameTool = true;
          console.log("same tool");
        }
      }
    }
  }


  // *** Edit Tools & Technologies ***

  deleteToolsFromDb(index :number , id:string){
    this.toolsTechnologiesList.concat(this.addedToolsList);
    if(id){
      this.toolsTechnologiesList.splice(index, 1);
      this.removeToolTechnology([id]);
    }else{ 
     console.log(this.addedToolsList);
      
    }
  }

  selectRankOnEdit(e :any, index :number){
    if(e){
      this.toolsTechnologiesList[index].rank = e;
    }else{
      this.toolsForm.get('rank').setValue("");
    }
  }


  saveOnEdit(){
      this.changeToolTechnology(this.toolsTechnologiesList);
   }

//  **** / ****


  setToolRankName(value:string){
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

  // &*& Mutations &*& 

//  *** ADD tools to DB ***
  addToolTechnology(tools :any){
    this.userProfileService
    .addToolTechnology(tools)
    .subscribe(({data}) => {
      let ids = data.AddToolTechnology.ids;
      this.addedToolsList = this.addedToolsList 
                                .map((newTools , i) => {
                                    return {
                                      id:ids[i],
                                      ...newTools,
                                    }
                                })
                          
    this.result.emit(this.addedToolsList); 
    })
  }


  // *** Remove tools from DB ***
  removeToolTechnology(id :string[]){
    this.userProfileService
    .removeToolTechnology(id).pipe(takeUntil(this.$destroy))
    .subscribe( ({id}) => {

    })
  }

  // *** Edit Tools *** 
  changeToolTechnology(data :any){
  
    this.userProfileService
    .ChangeToolTechnology(data).pipe(takeUntil(this.$destroy))
    .subscribe((data) => {
      this.result.emit();  
    })
  }
}
