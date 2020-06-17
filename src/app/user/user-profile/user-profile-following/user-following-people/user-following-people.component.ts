import { Component, OnInit,HostListener, ViewChild, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Apollo } from 'apollo-angular';

import { Followers } from '../../../../_shared/graphql/network/followers';
import { Observable, Subject } from 'rxjs';
import { map, debounceTime, takeUntil } from 'rxjs/operators';
import { graphqlUserProfile } from 'src/app/_shared/graphql/user-profile';
import {AppComponent} from '../../../../app.component';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { ActivatedRoute } from '@angular/router';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
 
@Component({
  selector: 'app-user-following-people',
  templateUrl: './user-following-people.component.html',
  styleUrls: [ './user-following-people.component.scss']
})
export class UserFollowingPeopleComponent implements OnInit,OnDestroy {

  @Input() hideFilters:boolean = false;

  toggle:any;
  connectionsList:any[] = [];
  connListlength:number;
  isSelectedConn:any;
  dontRepeatConQuery:boolean = true;
  selectedItem:any;
  searchForm: FormGroup;
  isSelected:boolean = true;
  // formGroups
  connectionsForm: FormGroup;
  checkAllConnForm: FormGroup;

  WYCDForm: FormGroup;
  savePDF: MouseEvent;
  imgUrlObject: any;
  index: any;
  reportBlockUer: any;
  modalType: string;
  userIndex: any;

  isCompany: boolean;
  isPeople: boolean = false; 
  userId: string; 
  myUserId: string; 
  userFollowings: any[] = []; 
  destroy$:Subject<any> = new Subject<any>();


  constructor(
    private apollo: Apollo,
    private fb:FormBuilder,    
    private appcomponent:AppComponent,
    private router :ActivatedRoute,
    private globalUserProServ :GlobalUserProService,
    private userprofileService:UserProfileService
  ) { 

    
    // connnections list form for checkbox
    this.connectionsForm = this.fb.group({
      checkbox: this.fb.array([])
    });

  }

  @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent
  
  ngOnInit() {

    this.router.params.subscribe(
      (data) => this.isPeople = data['type'] === 'people'
    )

    this.userId = this.router.snapshot.params['id']; 
    this.myUserId = this.globalUserProServ.getUserProfile().id; 


 
    this.toggle = {
      main: {
        active: [],
        selected: null
      },
      sub: {
        active: [],
        selected: null
      },

      view: {
        selected: 'card',
        card: true,
        list: false
      },

    }
    // ===== Forms

    // select all connections checkbox form
    this.checkAllConnForm = this.fb.group({
      check: ['']
    });

    this.WYCDForm = this.fb.group({
      block_report: ['']
    })
    //reportForm
 
    // search form
    this.searchForm = this.fb.group({
      search: ['',[Validators.required,Validators.minLength(3)]]
    });

    

    // forms value changes
    this.checkAllConnForm.valueChanges.subscribe(change => {
      this.connectionsForm.get('checkbox').patchValue(Array(this.connectionsForm.value.checkbox.length).fill(change.check));

      
    });

    this.connectionsForm.valueChanges.subscribe(change => {
      let findTrue = typeof change.checkbox != "undefined" ? change.checkbox.find( itm => itm == true ) : "undefined";
      if( typeof findTrue != 'undefined' ){
        this.isSelectedConn = true;
      }else{
        this.isSelectedConn = false;
      }
    });

    // this.mainQuery("");
    this.getFollowsOfUser();
    this.isCompany = this.globalUserProServ.isCompanyActive(); 

  }
  

  // toggle function
  myToggle( index,type? ){
    type ? type : type = "main";
    this.toggle[type]['active'][index] = !this.toggle[type]['active'][index];
    if( this.toggle[type]["selected"] != index ){
      this.toggle[type]['active'][this.toggle[type]["selected"]] = false;
    }
    this.toggle[type]["selected"] = index;
  }

  // toggle function for sort and view
  sort_and_wiew(event,type:string,itm?:string){
    let toggle = this.toggle;
    if( typeof itm != 'undefined' ){

      toggle[type][toggle[type]['selected']] = false;
      toggle[type]['selected'] = itm;
      toggle[type][itm] = true;
      toggle['main']['active'][toggle['main']['selected']] = false;
    }
  }



  // shortage for forms names
  get cnform(){ return this.connectionsForm.controls }
  get wydForm(){ return this.WYCDForm.controls }

  follow(userItem?){
    let itemId = [];
    if(userItem){
      itemId.push(userItem);
    }else{
      let value = this.cnform.checkbox.value;
      value.map( (item,index) =>{
        let findedUser = this.userFollowings.find( some => some.index === index && item );
        typeof findedUser != "undefined" ? itemId.push(findedUser) : null;
      });
    }
    
    itemId.map(user => {
      this.apollo.mutate({
        mutation: Followers.Follow,
        variables: {
          "userId": user.id,
        }
      }).subscribe(({data}) => {
        let findedIndex = this.userFollowings.findIndex( item => item.id == user.id );
        this.userFollowings[findedIndex].follow = true;
      });
    });
  }
 
 
  disconnect(id,index){
    this.apollo.mutate({
      mutation: Followers.Unfriend,
      variables: {
        userId: id
      }
    }).subscribe(responce => {
      this.userFollowings[index].friend = false;
 
    });
  }

  connect(id,index){
    this.apollo.mutate({
      mutation: Followers.SendFriendRequest,
      variables: {
        userId: id,
        description: ""
      }
    }).subscribe(responce => {

      this.userFollowings[index].friend_request = true
    });
  }

  reportBlock(user,index){
    if(user){
    this.userIndex = index;
    this.reportBlockUer = user; 
    this.modalType = 'reportBlock';
    this._modal.open();
    this._modal.title =  'What you can do';
  }
   }


   isBlockedUser(event){
      if(event){
      this.connectionsList.splice(this.userIndex,1)
    }
   }

  close(event){
    if(event){
        this._modal.close();
    }
  }

  openSmallChatBox(fName, lName, avatar, id) {
    let mutation = this.globalUserProServ.isCompanyActive() ?
                    this.userprofileService
                        .openSmallChatBoxForComapny({
                            avatar , 
                            name:`${fName} ${lName}` , 
                            id , 
                            companyId:this.globalUserProServ.getComapnyId()
                          }) :   /// Company 
                    this.userprofileService
                        .openSmallChatBox({avatar , id , name:`${fName} ${lName}` }); /// User

      mutation
      .pipe(takeUntil(this.destroy$))
      .subscribe(({data}) => {
        let chatId = data.CreateConversation ? 
                    data.CreateConversation.id  :  /// User 
                    data.CreateConversationForCompany.id; /// Company 
                    
        this.appcomponent.addChatBox(chatId);
      });
  }

    saveToPDF(e:MouseEvent,i){
      e.preventDefault();
      this.savePDF = e;
       this.index = i ;
      return false;
    }


      imgUrl(event){     
        this.imgUrlObject = event;    
      }

      getFollowsOfUser(){
        return this.userprofileService
        .getFollowsOfUser(this.userId)
        .subscribe(
          (data) => {     
            // this.connecTionQuery(data);  
            data['getFollowsOfUser'].profiles.map((item,ind) => {
              if( this.dontRepeatConQuery ){ 
                (this.connectionsForm.controls.checkbox as FormArray).push( 
                  this.fb.control('') 
                ); 
                item.index = ind;  
              } 
              this.userFollowings = item;
            })
            this.userFollowings = data['getFollowsOfUser'].profiles
      
          }
        )
      }



      ngOnDestroy(): void {
        this.getFollowsOfUser().unsubscribe();
      }
}
