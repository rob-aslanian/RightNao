import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { IUserSkill, ISkill } from 'src/app/_shared/models/user/skill.interface';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-skills-expertise',
  templateUrl: './skills-expertise.component.html',
  styleUrls: ['./skills-expertise.component.scss']
})
export class SkillsExpertiseComponent implements OnInit {

   _data;
  @Input() 
          set data( value:IUserSkill ){
             this._data = value;
             this.skills = this._data['skills'];
             this.isMe = value['isMe'];
             this.userId = value['userId'];
        
            
             
          }

          get skillsdata(){
            return this._data;
          }

  @ViewChild(AppModalComponent, { static: true }) modal: AppModalComponent;

  startPage:number = 3;

  skills:ISkill[] = [];
  isMe:boolean = false;
  modalType:string;
  userId:string;

  verifiedSkills:{
    skill_id?:string;
    verify?:boolean,
  }[] = [];
  endorsementCount:number = 16;
  isAuth:boolean = false;

  constructor(
    private userService:UserProfileService,
    private globalService:GlobalUserProService,
    private translate: TranslateService
  ) { 

    this.isAuth = globalService.isAuthenticated();
  }


  get currentUserId() : string {
    return this.globalService.isAuthenticated && 
           this.globalService.getUserProfile()['id']
  }

  get hasPermission() : boolean {
    return !this.isMe && this.isAuth && !this.globalService.isCompanyActive()
  }

  ngOnInit() {
 
      this.skills = this._data['skills'];
      console.log(this._data);
        
  

    
    // Add verifed skills 
    this.addVerificationSkill();
    
  }

  isSkillVerify(skillId) : boolean{

     if(this.verifiedSkills.length > 0){
       let indexOfSkill  = this.verfifyIndex(skillId);
       return indexOfSkill > -1 ? this.verifiedSkills[indexOfSkill].verify : false;
     }

     return false;
  }

  getSkills(skills:ISkill[]){
    if(skills && skills.length > 0){
      this.skills.unshift(...skills);
    }
    this.modal.close();
  }

  userIndex(endorsements:[]) : number {
    if(endorsements.length > 0){
      return endorsements.findIndex((endor:any) => endor.id === this.currentUserId);
    }
    return -1;
  }
 
  verfifyIndex(skillId:string) : number {
      if(skillId){
        return  this.verifiedSkills.findIndex(ver => ver.skill_id === skillId)
      }
      return -1;
  }

  getSkillsEndorsments(skillId){
    return this.skills.find(skill => skill.id === skillId)['endorsements'];
  }

  addVerificationSkill(){
     if(this.skills.length > 0){
        this.skills.map(skill => {
         let verify =  skill.endorsements.some(end => end.id === this.currentUserId);
          return this.verifiedSkills.push(
            {
              skill_id:skill.id,
              verify
            }
          );
       })
     }
 
  }

  verifySkill(skill , idx:number){
    let verifyIndex = this.verfifyIndex(skill.id) ;
    
    this.verifiedSkills[verifyIndex > -1 ? verifyIndex : idx].verify = true;

    this.userService
        .verifySkill(this.userId , skill.id)
        .subscribe(
          (data) => {
            let endorsements:any[] = skill.endorsements,
                avatar = this.globalService.getUserProfile()['avatar'];

                return endorsements.push({
                  avatar,
                  id:this.currentUserId
                });

          },
          (err) => console.log(err),
          
        )

    return false;
  }

  toggleEndorsments(skillId){
    if(this.endorsementCount ===  this.getSkillsEndorsments(skillId).length ){
      this.endorsementCount = 16;
    }else{
     this.endorsementCount = this.getSkillsEndorsments(skillId).length;
    }

  
  }

  unVerifySkill(skill , idx:number){
    let verifyIndex = this.verfifyIndex(skill.id);
    this.verifiedSkills[verifyIndex > -1 ? verifyIndex : idx].verify = false;
    
    this.userService
        .unVerifySkill(this.userId , skill.id)
        .subscribe(
          () => {
             let endorsements:[] = skill.endorsements,
                 userInex =  this.userIndex(endorsements);

             userInex > -1 ? endorsements.splice(userInex , 1) : null;
          
          }
        )
  }


  open(type?:string){

    this.modal.open();
    this.modalType = type;

    /// Edit 
    if(type === 'edit'){
      this.modal.$title = this.translate.get('499');
    }
    /// Add
    else{
      this.modal.$title = this.translate.get('89');
    }
  }
  openEmptyModal() {
    this.open( 'add' );
  }
}
