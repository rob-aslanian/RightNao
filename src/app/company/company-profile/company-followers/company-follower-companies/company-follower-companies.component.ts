import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { AppComponent } from 'src/app/app.component';
import { Subject } from 'rxjs';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { takeUntil } from 'rxjs/operators';
import { Followers } from 'src/app/_shared/graphql/network-company/followers';
import { graphqlUserProfile } from 'src/app/_shared/graphql/user-profile';
import { Following } from 'src/app/_shared/graphql/network-company/following';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';

@Component({
  selector: 'app-company-follower-companies',
  templateUrl: './company-follower-companies.component.html',
  styleUrls: ['../../../../_shared/css/modals_shared_styles.scss', '../../../../network/network.component.scss', './company-follower-companies.component.scss']
})
export class CompanyFollowerCompaniesComponent implements OnInit, OnDestroy {
  [x: string]: any;

  myCompanyId :string;
  companyID :string;
  companyFollowerCompanies :any[] = []; 

  destroy$:Subject<any> = new Subject<any>();

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  toggle:any;
  connListlength:number;
  isSelectedConn:any;
  dontRepeatConQuery:boolean = true;
  selectedItem:any;
  searchForm: FormGroup;
  

  // formGroups
  connectionsForm: FormGroup;
  checkAllConnForm: FormGroup;

  WYCDForm: FormGroup;
  selectedCompany: any;
  modalType: string;
  
  constructor(
    private router :ActivatedRoute,
    private companyProfileService: CompanyProfileService,
    private apollo: Apollo,
    private fb:FormBuilder,
    private globalUserProfileService: GlobalUserProService,
    private utilService:UtilsService,
    private appComponent:AppComponent,
    private companyService: CompanyProfileService,
    private userProfileService :UserProfileService
  ) { }

  ngOnInit() {
    this.companyID = this.router.snapshot.params['id'];
    this.getFollowersCompaniesOfCompany();
    this.myCompanyId = this.globalUserProfileService.getCompanyProfile().id; 
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
    });

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

    // Search form valuechanges
    // this.searchForm.get("search").valueChanges.pipe(debounceTime(700)).subscribe((val) => {
    //   if(this.searchForm.get("search").valid || val.trim() == ""){
    //     this.mainQuery(val);
    //   }
    // });
    
  }

  getFollowersCompaniesOfCompany(){
    return this.companyProfileService
    .getFollowersCompaniesOfCompany(this.companyID)
    .subscribe(data => {
      data['getFollowersCompaniesOfCompany'].profiles.map((item,ind) => {
        if( this.dontRepeatConQuery ){ 
          (this.connectionsForm.controls.checkbox as FormArray).push( 
            this.fb.control('') 
          ); 
          item.index = ind;  
        } 
        this.companyFollowerCompanies = item;
      })
      this.companyFollowerCompanies = data['getFollowersCompaniesOfCompany'].profiles;

    })
  }

  

  connecTionQuery(data){
    this.companyFollowerCompanies = [];
    data.map((item,ind)=>{
      // add unic index
      if( this.dontRepeatConQuery ){
        (this.connectionsForm.controls.checkbox as FormArray).push(
          this.fb.control('')
        );
        item.index = ind;
      }
      this.companyFollowerCompanies.push(item);
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

  follow(companyItem?){
    let itemId = [];
    if(companyItem){
      itemId.push(companyItem);
    }else{
      let value = this.cnform.checkbox.value;
      value.map( (item,index) =>{
        let foundCompany = this.companyFollowerCompanies.find( some => some.index === index && item );
        typeof foundCompany != "undefined" ? itemId.push(foundCompany) : null;
      });
    }
    
    itemId.map(company => {
      this.apollo.mutate({
        mutation: Followers.FollowCompanyForCompany,
        variables: {
          "companyId": this.myCompanyId,
          "followId": company.id,
        }
      }).subscribe(({data}) => {
        let foundIndex = this.companyFollowerCompanies.findIndex( item => item.id == company.id );
        this.companyFollowerCompanies[foundIndex].follow = true;
      });
    });
  }


  followingToggle(id,type){
    let responce:boolean = type == 'FollowCompany' ? true : false;

    
    this.apollo.mutate({
      mutation: Following[type],
      variables: {
        companyId: this.myCompanyId,
        followId:id,
      }
    }).subscribe(data => {
      let findedIndex = this.companyFollowerCompanies.findIndex( item => item.id == id );
      this.companyFollowerCompanies[findedIndex]["follow"] = responce;
      // this.companyFollowingCompanies.splice(findedIndex,1);
      this.connListlength = this.companyFollowerCompanies.length;
      // this.modifyQuery(this.companyFollowingCompanies);
    });
  }


  closeModal(event){
    event.preventDefault();
    this.toggle.main.active[this.toggle.main.selected] = false;
  }

  open(type:string , item?:any){

    this.selectedCompany = item;
    this.modalType = type;
    this.modal.open();

    if(type === 'report'){
        this.modal.title = `Report ${item.name}`;
    }

    if(type === 'review'){
      this.modal.title = `Write review to ${item.name}`;
    }
  }


  openSmallChatBox(user) {
    let {fName,lName,avatar,id } = user

    let mutation = this.globalUserProfileService.isCompanyActive() ?
                    this.userProfileService
                        .openSmallChatBoxForComapny({
                            avatar , 
                            name:`${fName} ${lName}`, 
                            id , 
                            companyId:this.globalUserProfileService.getComapnyId()
                          }) :   /// Company 
                    this.userProfileService
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


  ngOnDestroy(): void {
    // this.getFollowersCompaniesOfCompany().unsubscribe();
  }
    
}
