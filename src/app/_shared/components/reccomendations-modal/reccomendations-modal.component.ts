import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { utilities } from "../../utilities/utilities";
import { CompanyProfileService } from "../../services/companies/company-profile.service";
import { Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { RecommendationRelation } from "../../models/shared/shared.models";
 
@Component({
  selector: "app-reccomendations-modal",
  templateUrl: "./reccomendations-modal.component.html",
  styleUrls: ["./reccomendations-modal.component.scss"]
})
export class ReccomendationsModalComponent implements OnInit {

  @Output() result: EventEmitter<object> = new EventEmitter<object>();
  @Input()  modalType: string;
  @Input()  data;

  submitedForm: boolean = false;

  selectedUser = {
    id: null,
    avatar: null,
    fullName: null,
    company: null,
    position: null
  };

  textAreatTitle: string;
  isSelectUser: boolean = false;
  submited: string;
  modalForm: FormGroup;
  textAreaLength: number;
  utils = utilities;
  searhUsers: Observable<any>;
  isSearch: boolean = false;
  relations = RecommendationRelation;

  constructor(
    private f: FormBuilder,
    private companyServcice:CompanyProfileService
  ) {
    this.modalForm = f.group({
      user:[''],
      user_id: ["", Validators.required],
      text: [""],
      relation:["no_relation"],
      title:[""],
    });
  }

  ngOnInit() {
    if (this.modalType && this.modalType !== null) {
      if (this.modalType === "ask") {
          this.textAreatTitle = "Ask for a Recommendation";
          this.textAreaLength = 1000;

          if(!this.data.me) { 
             this.relationsData(this.data.firstname);
          }

      } else {
          this.textAreatTitle = "Write a Reccomendations";
          this.textAreaLength = 2000;
          this.relationsData(this.data.firstname);
      }
    }



  }

  
  submitForm(form: FormGroup , e:MouseEvent) {
    e.preventDefault();

    this.submitedForm = true;
    let type = this.modalType;       
    if( type === 'ask'  &&  ( this.modalForm.get('user_id').invalid && this.data && this.data.me )) {
            this.modalForm.get('user').setErrors({incorrect:true})   
            return;
      }

    if (this.modalType === 'recommend') {
   
     
      let result = {
          user_id: this.data.id,
          text: form.value["text"],
          relation:form.value["relation"],
          title:form.value["title"],
          _type: "recommend"

      };
      this.result.emit(result);

    } else if (this.modalType === 'ask' ) {
      
      let result = {
            user_id: this.data.me ?  form.value["user_id"] : this.data.id,
            text: form.value["text"],
            relation:form.value["relation"],
            title:form.value["title"],
            isAsking: this.data.me ? true : false,
            _type: "ask"
      };
      this.result.emit(result);

    } else if (this.modalType === 'writeRecommendation') {

          let result = {
              user_id: this.data.id,
              text: form.value["text"],
              avatar: this.data.avatar,
              is_hidden: null,
              fullName: this.data.firstname  + " " +  this.data.lastname 
          };
         this.result.emit(result);
     }

   }



  search(event:any):void{
    let e = event.target.value;
           e.length >1?this.searhUsers =  this.companyServcice
                .searchUsers(e)
                .pipe(
                  distinctUntilChanged(),
                  map(({data}) =>  data['searchUsers']['profiles'])
                ) : this.searhUsers = null;
    
     }




    selectUser(event){
 
    let id = event.id;
          this.modalForm.get('user').setValue('')
          this.modalForm.get('user_id').setValue(event.id)
          this.searhUsers = null;
          this.isSearch = true;

          if (event) {   
            this.isSelectUser = true;
            this.selectedUser.id = event.id;
            this.selectedUser.avatar =
            event.avatar === "" || null
                ? "assets/img/124.svg"
                : `/file/${event.avatar}`;
            this.selectedUser.fullName = `${event.firstname} ${
            event.lastname
            }`;
            this.selectedUser.company  = event.experiences.length > 0 ? `${event["experiences"][event.experiences.length -1]["title"]} `:null
            this.selectedUser.position = event.experiences.length > 0? ` ${event["experiences"][event.experiences.length -1]["company"]}`:null;


            this.relationsData(event.firstname);
          }        
    }

    selectTitle(e) {
      const target = e.target,
            options = target.options,
            name = options[target.selectedIndex].textContent;

        this.modalForm.get('title')
                      .setValue(name);        
    }

    relationsData(name:string) {
      return this.relations.map(el => {
        el.name =  el.name.replace('%_%' , name);
        return el;
      })
    }

    trackByFn =  (index) => index;
}
