import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { graphqlUserProfile } from 'src/app/_shared/graphql/user-profile';
import { Followers } from 'src/app/_shared/graphql/network/followers';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';

@Component({
  selector: 'app-company-follower-people',
  templateUrl: './company-follower-people.component.html',
  styleUrls: [ '../../../../network/network.component.scss', './company-follower-people.component.scss']
})
export class CompanyFollowerPeopleComponent implements OnInit, OnDestroy {

  destroy$:Subject<any>= new Subject<any>();

  @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent
  
  myCompanyId :string;
  companyId :string;
  companyFollowerPeople :any[] = []; 

  toggle:any;
  connectionsList:any[] = [];
  selectedUser :any; 
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
  savePDF: boolean;
  imgUrlObject: any;
  index: any;
  reportBlockUer: any;
  modalType: string;
  userIndex: any;

  myUserId :string; 

  
  constructor(
    private companyProfileService: CompanyProfileService,
    private router: ActivatedRoute,
    private apollo: Apollo,
    private fb:FormBuilder,
    private appComponent:AppComponent,
    private utilService :UtilsService,
    private globalUserService :GlobalUserProService,
    private userprofileService:UserProfileService
  ) { }

  ngOnInit() {
    this.companyId = this.router.snapshot.params['id']; 
    this.myCompanyId = this.globalUserService.getCompanyProfile().id;
    this.myUserId = this.globalUserService.getUserProfile().id;
    
    this.getFollowersOfCompany();
    
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

    // connnections list form for checkbox
    this.connectionsForm = this.fb.group({
      checkbox: this.fb.array([])
    });

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


   

    

  }

  // &** Get follower people **&
  getFollowersOfCompany(){
    let companyId = this.companyId

    return this.companyProfileService
    .getFollowersOfCompany(companyId)
    .subscribe(
      (data) =>{
        data['getFollowersOfCompany'].profiles.map((item,ind) => {
          if( this.dontRepeatConQuery ){ 
            (this.connectionsForm.controls.checkbox as FormArray).push( 
              this.fb.control('') 
            ); 
            item.index = ind;  
          } 
          this.getFollowersOfCompany = item;
        })
        this.companyFollowerPeople = data['getFollowersOfCompany'].profiles;
      }
    )
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
        let findedUser = this.companyFollowerPeople.find( some => some.index === index && item );
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
        let findedIndex = this.companyFollowerPeople.findIndex( item => item.id == user.id );
        this.companyFollowerPeople[findedIndex].follow = true;
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
      this.connectionsList[index].user_profile.friend = false;
 
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
      this.connectionsList[index].user_profile.friend_request = true
    });
  }

  open(type:string , user){
    this.modalType = type;
    this._modal.open();

    this.selectedUser = user;
    this._modal.title = `Report ${user.firstname}`;
  }

  saveToPDF(user){
    this.selectedUser = user;
    this.savePDF = true;
  }

  

  //  isBlockedUser(event){
  //     if(event){
  //     this.connectionsList.splice(this.userIndex,1)
  //   }
  //  }

  close(event){
    if(event){
        this._modal.close();
    }
  }


  openSmallChatBox(user) {
    let {fName, lName, avatar, id} = user;
    let mutation = this.globalUserService.isCompanyActive() ?
                    this.userprofileService
                        .openSmallChatBoxForComapny({
                            avatar , 
                            name:`${fName} ${lName}` , 
                            id , 
                            companyId:this.globalUserService.getComapnyId()
                          }) :   /// Company 
                    this.userprofileService
                        .openSmallChatBox({avatar , id , name:`${fName} ${lName}` }); /// User

      mutation
      .pipe(takeUntil(this.destroy$))
      .subscribe(({data}) => {
        let chatId = data.CreateConversation ? 
                    data.CreateConversation.id  :  /// User 
                    data.CreateConversationForCompany.id; /// Company 
                    
        this.appComponent.addChatBox(chatId);
      });
  }

      imgUrl(event){     
        this.imgUrlObject = event ;    
      }

      ngOnDestroy(): void {
        // this.getFollowersOfCompany().unsubscribe();
      }
}
