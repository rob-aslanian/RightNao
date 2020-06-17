import { Component, OnInit, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { AppComponent } from 'src/app/app.component';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { graphqlUserProfile } from 'src/app/_shared/graphql/user-profile';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IProfilePopup } from 'src/app/_shared/models/shared/shared.models';

@Component({
  selector: 'app-user-following-company',
  templateUrl: './user-following-company.component.html',
  styleUrls: ['./user-following-company.component.scss']
})
export class UserFollowingCompanyComponent implements OnInit {

  userFollowingCompanies: any[] = []; 
  userId: string; 

  @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent 
  toggle:any;
  connectionsList:any[] = [];
  connListlength:number;
  isSelectedConn:any;
  dontRepeatConQuery:boolean = true;
  selectedItem:any;
  searchForm: FormGroup;
  companyId :string; 
  myCompanyID :string; 
  // formGroups
  connectionsForm: FormGroup;
  checkAllConnForm: FormGroup;

  WYCDForm: FormGroup;
  isSelected:boolean = true;
  modalType: string;
  companyReport: any;
  idC: any;
  companyIndex: any;
  profilePopUp:IProfilePopup[] = [];
  
  destroy$:Subject<any> = new Subject<any>();

  @HostListener("document:click", ["$event.target"]) function(e: HTMLElement) {
    if (!e.classList.contains("btn-more") &&  this.toggle['main']['active'][this.toggle['main']["selected"]] && this.isSelected) {
      this.toggle['main']['active'][this.toggle['main']["selected"]]  = ! this.toggle['main']['active'][this.toggle['main']["selected"]] ;
      this.toggle['main']['active'][this.toggle['main']["selected"]] = false;
    
        }}
  constructor(
    private router :ActivatedRoute,
    private apollo :Apollo,
    private fb :FormBuilder,
    private appcomponent :AppComponent,
    private companyService :CompanyProfileService,
    private userprofileService :UserProfileService,
    private globalUserProService :GlobalUserProService
  ) { }

  ngOnInit() {
    this.userId = this.router.snapshot.params['id'];
    this.getFollowsCompaniesOfUser(); 

    
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

  // Get following companies for user 
  getFollowsCompaniesOfUser(){
    return this.userprofileService
    .getFollowsCompaniesOfUser(this.userId)
    .subscribe(data => {
      data['getFollowsCompaniesOfUser'].profiles.map((item,ind) => {
        if( this.dontRepeatConQuery ){ 
          (this.connectionsForm.controls.checkbox as FormArray).push( 
            this.fb.control('') 
          ); 
          item.index = ind;  
        } 
        this.getFollowsCompaniesOfUser = item;
      })
      this.userFollowingCompanies = data['getFollowsCompaniesOfUser'].profiles
    
    }) 
  }

  
  connecTionQuery(data){
    this.connectionsList = [];
    data.map((item,ind)=>{
      // add unic index
      if( this.dontRepeatConQuery ){
        (this.connectionsForm.controls.checkbox as FormArray).push(
          this.fb.control('')
        );
        item.index = ind;
      }
      this.connectionsList.push(item);
    });
    this.dontRepeatConQuery = false;
  
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
      this.userFollowingCompanies[index].follow = true;
    }
 
  else  if(type === "unfollow"){
      this.companyService.unfollowCompany(id).subscribe( data => console.log(data));;
      this.userFollowingCompanies[index].follow = false;
    }
  }


  closeModal(event){
    event.preventDefault();
    this.toggle.main.active[this.toggle.main.selected] = false;
    this.isSelected = true;
  }

  reportCompany(company:any,index){
         this.companyIndex = index;
         this.companyReport =   company;
         this._modal.title = `Report ${company.name}`;
         this.modalType ='reportCompany';
         this._modal.open();
  }

  isBlockedCompany(event){
        if(event){
           this.userFollowingCompanies.splice(this.companyIndex,1);
        }
 }


  openSmallChatBox(user) {
    let {fName,lName,avatar,id } = user

    let mutation = this.globalUserProService.isCompanyActive() ?
                    this.userprofileService
                        .openSmallChatBoxForComapny({
                            avatar , 
                            name:`${fName} ${lName}` , 
                            id , 
                            companyId:this.globalUserProService.getComapnyId()
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

    close(event) {
    if(event){
        this._modal.close(); 
      }
    }

    openReview(company) {
      this.idC= company.id;
      this._modal.open();
      this._modal.title = `Write a Review to ${company.name}`; 
      this.modalType = 'write';

      }

      

      
}
