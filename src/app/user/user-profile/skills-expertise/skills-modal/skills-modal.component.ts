import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import skillsExpertise from 'src/assets/data/en/slillsExp';
import { map, filter, distinctUntilChanged, debounceTime, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { ISkill } from 'src/app/_shared/models/user/skill.interface';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-skills-modal',
  templateUrl: './skills-modal.component.html',
  styleUrls: ['./skills-modal.component.scss']
})
export class SkillsModalComponent implements OnInit {

  @Input() modalType:string ;
  @Input() data:ISkill[];
  
  @Output() result: EventEmitter<ISkill[]> = new EventEmitter<ISkill[]>();

  skillControl:FormControl;
  skills:string[] = [];
  submitForm:boolean = false;
  skillsLength: number = 0;
  utils = utilities;
  skillsData:string[] = [];

  
  constructor(
    private userService:UserProfileService
  ) { }

  ngOnInit() {
    this.skillControl = new FormControl('');
    this.data.map(skill => {
           this.skillsData.push(skill.name);
    });
  }



  addSkills(e?:NgbTypeaheadSelectItemEvent){

 
    this.skillsLength =  this.skills.length   + this.data.length  ;
  
    if(this.skillsLength >= 50){
      console.log('error');
      
        return;
    }
    let skill = this.skillControl.value,
        control = this.skillControl;
  
    this.submitForm = true;

    /// Select item 
    if(e){
      e.preventDefault();
      skill = e.item;
    }

    /// Add item 
    if(skill && control.valid && !skill.match(/^\W+$/)){
     
    let Skills = this.skillsData.concat(this.skills);
    let isSkillExists =  Skills.includes(skill);

      if(isSkillExists){
        this.skillControl.setErrors({already_exist:true})
        
        return;
      }else if(!isSkillExists){
      this.skills.unshift(skill.trim());
      }      
     
      
      
      this.skillControl.reset();
    }

    this.submitForm = false;
    
    
  }
  deleteSkill(index:number){  
    if(this.skills[index]){
      this.skills.splice(index , 1);
      this.skillsLength--;
    }

  }

  submit(){

    if(this.skills.length > 0 ){
        let skills  = this.skills.map(skill => ({ skill }));
       
        this.userService
            .addSkills(skills)
            .subscribe(
              ({data})  => {
                let id = data['AddSkills'].id;

                if(id){
                  let result = this.skills.map(name => ({id , name}));
                  this.skills = [];
                  this.result.emit(result);
                }
                
              },
              (err) => console.log(err)
            )
        
    }
  }

  searchSkills = (text:Observable<string>) => 
    text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(val => val.length >= 2 ),
      map(skill =>  (skill === '' ? skillsExpertise
        : skillsExpertise.filter(val => val.toLowerCase().includes(skill.toLowerCase()) ))
                         .slice(0 , 15).sort((a,b) => a.length < b.length ? -1 : 1)
      )
   )


   drop(e: CdkDragDrop<any>) {
    let skills = this.data || [];

    moveItemInArray(skills, e.previousIndex, e.currentIndex);

    if (skills[e.currentIndex]) {
      this.userService
          .changeSkillsOrder(
            {
              id:skills[e.currentIndex].id,
              position:e.currentIndex
            }
          )
          .subscribe();
    }
  }

  /// Remove skill from db ///
  removeSkill(id:string){
    let indexOfSkill = this.data.findIndex(skill => skill.id === id);

    if(indexOfSkill > -1){
       this.data.splice(indexOfSkill , 1);
       this.userService
           .removeSkill([id])
           .subscribe();
    }
  }


}
