import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { graphqlUserProfile } from 'src/app/_shared/graphql/user-profile';
import { Apollo } from 'apollo-angular';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IProfilePopup } from 'src/app/_shared/models/shared/shared.models';

@Component({
  selector: 'app-user-followers-company',
  templateUrl: './user-followers-company.component.html',
  styleUrls: ['./user-followers-company.component.scss']
})
export class UserFollowersCompanyComponent implements OnInit {
  
  userFollowerCompanies :any[] = []; 
  userId :string;
  myCompanyId :string; 

  @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent 
  toggle:any;
  connectionsList:any[] = [];
  connListlength:number;
  isSelectedConn:any;
  dontRepeatConQuery:boolean = true;
  selectedItem:any;
  searchForm: FormGroup;
  companyId
  profilePopUp:IProfilePopup[] = [];


  // formGroups
  connectionsForm: FormGroup;
  checkAllConnForm: FormGroup;

  WYCDForm: FormGroup;
  isSelected:boolean = true;
  modalType: string;
  companyReport: any;
  idC: any;
  companyIndex: any;


  destroy$:Subject<any> = new Subject<any>();

  
  @HostListener("document:click", ["$event.target"]) function(e: HTMLElement) {
    if (!e.classList.contains("btn-more") &&  this.toggle['main']['active'][this.toggle['main']["selected"]] && this.isSelected) {
      this.toggle['main']['active'][this.toggle['main']["selected"]]  = ! this.toggle['main']['active'][this.toggle['main']["selected"]] ;
      this.toggle['main']['active'][this.toggle['main']["selected"]] = false;

        }}
  constructor(
    private router :ActivatedRoute,
    private fb :FormBuilder,
    private appcomponent :AppComponent,
    private companyService :CompanyProfileService,
    private apollo :Apollo,
    private globalUserProService :GlobalUserProService,
    private userProfileService :UserProfileService
  ) { }

  ngOnInit() {
  this.userId = this.router.snapshot.params['id']
  this.getFollowersCompaniesOfUser();  

  
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



  // search form
  this.searchForm = this.fb.group({
    search: ['',[Validators.required,Validators.minLength(3)]]
  });

  //report form 

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


  // Get Follower companies for user 
  getFollowersCompaniesOfUser(){
    return this.userProfileService
    .getFollowersCompaniesOfUser(this.userId)
    .subscribe(data => {
      data['getFollowersCompaniesOfUser'].profiles.map((item,ind) => {
        if( this.dontRepeatConQuery ){ 
          (this.connectionsForm.controls.checkbox as FormArray).push( 
            this.fb.control('') 
          ); 
          item.index = ind;  
        } 
        this.getFollowersCompaniesOfUser = item;
        this.profilePopUp.push({
                  profileId:item.id,
                  isCompany:true,
                  isFollowed:item.follow,
                  isBlocked:item.blocked,
                  isConnect:item.friend,
                  isFavorite:item.favorite,
                  isFriendRequest:item.friend_request,
        })
      })
     this.userFollowerCompanies = data['getFollowersCompaniesOfUser'].profiles;
    })
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


  followCompany(type,id,index){
    if(type === "follow"){
      this.companyService.followCompany(id).subscribe( data => console.log(data));
      this.userFollowerCompanies[index].follow = true;
    }
 
  else  if(type === "unfollow"){
      this.companyService.unfollowCompany(id).subscribe( data => console.log(data));;
      this.userFollowerCompanies[index].follow = false;
    }
  }


  closeModal(event){
    event.preventDefault();
    this.toggle.main.active[this.toggle.main.selected] = false;
    this.isSelected = true;
  }

  reportCompany(company:any, index){
         
         this.companyIndex = index;
         this.companyReport =   company;
         this._modal.title = `Report ${company.name}`;
         this.modalType ='reportCompany';
         this._modal.open();
  }

  isBlockedCompany(event){
        if(event){
           this.userFollowerCompanies.splice(this.companyIndex,1);
        }
 }


  openSmallChatBox(user) {
    let {fName,lName,avatar,id } = user

    let mutation = this.globalUserProService.isCompanyActive() ?
                    this.userProfileService
                        .openSmallChatBoxForComapny({
                            avatar , 
                            name:`${fName} ${lName}` , 
                            id , 
                            companyId:this.globalUserProService.getCompanyProfile().id
                          }) :   /// Company 
                    this.userProfileService
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


    close(event){
    if(event){
        this._modal.close()
      }
    }

    openReview(company){
      this.idC= company.id;
      this._modal.open();
      this._modal.title = `Write a Review to ${company.name}`; 
      this.modalType = 'write';
      }

    

}
