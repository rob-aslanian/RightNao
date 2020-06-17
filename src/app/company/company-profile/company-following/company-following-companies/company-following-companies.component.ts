import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { AppComponent } from 'src/app/app.component';
import { Apollo } from 'apollo-angular';
import { Following  } from "../../../../_shared/graphql/network-company/following";
// import { Following } from 'src/app/_shared/graphql/network/following';
import { Observable, Subject } from 'rxjs';
import { graphqlUserProfile } from 'src/app/_shared/graphql/user-profile';
import { map, takeUntil } from 'rxjs/operators';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { isNgTemplate } from '@angular/compiler';
import { Followers } from 'src/app/_shared/graphql/network-company/followers';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';

@Component({
  selector: 'app-company-following-companies',
  templateUrl: './company-following-companies.component.html',
  styleUrls: ['../../../../network/network.component.scss','./company-following-companies.component.scss']
})
export class CompanyFollowingCompaniesComponent implements OnInit, OnDestroy {
  
  @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent;
  destroy$:Subject<any>= new Subject<any>();


  selectedCategory: any;
  toggle:any;
  companiesList:any[] = [];
  allCategoriesCouter:any = [];
  allCategoriesList:object;
  connListlength:number;
  isSelectedConn:any;
  dontRepeatConQuery:boolean = true;
  selectedItem:any;
  changeConnLength:boolean = true;
  selectedCatAndScat: any;
  modalType:string;
  // formGroups
  connectionsForm: FormGroup;
  checkAllConnForm: FormGroup;
  searchForm: FormGroup;

  allCatBusinessForm: FormGroup;
  allCatOtherForm: FormGroup;
  isSelected:boolean = true;
  WYCDForm: FormGroup;
  review:boolean = true;
  companyReport: any;
  companyReview: any;
  companyIndex: any;

  
  companyId :string;
  myCompanyID :string; 
  companyFollowingCompanies :any[] = [];

  constructor(
    private companyProfileService :CompanyProfileService,
    private router :ActivatedRoute,
    private globalUserProService :GlobalUserProService,
    private apollo: Apollo,
    private fb:FormBuilder,
    private appcomponent:AppComponent,
    private utilsService :UtilsService,
    private userProfileService :UserProfileService
  ) { }
  @HostListener("document:click", ["$event.target"]) function(e: HTMLElement) {
    if (!e.classList.contains("btn-more") &&  this.toggle['main']['active'][this.toggle['main']["selected"]] && this.isSelected ) {
      this.toggle['main']['active'][this.toggle['main']["selected"]]  = ! this.toggle['main']['active'][this.toggle['main']["selected"]] ;
      this.toggle['main']['active'][this.toggle['main']["selected"]] = false;
        }}

  ngOnInit() {
    this.companyId = this.router.snapshot.params['id'];
    this.myCompanyID = this.globalUserProService.getCompanyProfile().id;
    this.getFollowsCompaniesOfCompany();
    
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
      sort: {
        selectedText: 'Recently added',
        selected: '',
        name: false,
        rating: false,
        recently_added: false,
        number_of_followers: false
      },

      subNavSelected: []
    }

    
    this.toggle["subNavSelected"]["all"] = true;
 
    // ===== Forms

    // connnections list form for checkbox
    this.connectionsForm = this.fb.group({
      checkbox: this.fb.array([])
    });

    // search form
    this.searchForm = this.fb.group({
      search: ['',[Validators.required,Validators.minLength(3)]]
    });
    //report form
    // select all connections checkbox form
    this.checkAllConnForm = this.fb.group({
      check: ['']
    });

    this.allCatBusinessForm = this.fb.group({
      addCategory: ['']
    });
    this.allCatOtherForm = this.fb.group({
      addCategory: ['']
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

      if( type == 'sort' ){
        // this.sort_by(itm,type,event);
      }
      
    }
  }

  // shortage for forms names

  get cnform(){ return this.connectionsForm.controls }

  get BusinessForm(){ return this.allCatBusinessForm.controls }
  get OtherForm(){ return this.allCatOtherForm.controls }
  get wydForm(){ return this.WYCDForm.controls }


  followingToggle(id,type){
    let responce:boolean = type == 'FollowCompany' ? true : false;
    
    this.apollo.mutate({
      mutation: Following[type],
      variables: {
        companyId: this.myCompanyID,
        followId:id,
      }
    }).subscribe(data => {
      let findedIndex = this.companyFollowingCompanies.findIndex( item => item.id == id );
      this.companyFollowingCompanies[findedIndex]["follow"] = responce;
      this.connListlength = this.companyFollowingCompanies.length;
      // this.modifyQuery(this.companyFollowingCompanies);
    });
  }

  follow(companyItem?){
    let itemId = [];
    if(companyItem){
      itemId.push(companyItem);
    }else{
      let value = this.cnform.checkbox.value;
      value.map( (item,index) =>{
        let foundCompany = this.companyFollowingCompanies.find( some => some.index === index && item );
        typeof foundCompany != "undefined" ? itemId.push(foundCompany) : null;
      });
    }
    
    itemId.map(company => {
      this.apollo.mutate({
        mutation: Followers.FollowCompanyForCompany,
        variables: {
          "companyId": this.myCompanyID,
          "followId": company.id,
        }
      }).subscribe(({data}) => {
        let foundIndex = this.companyFollowingCompanies.findIndex( item => item.id == company.id );
        this.companyFollowingCompanies[foundIndex].follow = true;
      });
    });
  }

 
  close(event){
    if(event){
      this._modal.close();
    }
  }
 
  //  report block start
  reportCompany(item:any, index){
    this.companyIndex = index;
    this.companyReport =   item.id;
    this._modal.title = `Report ${item.name}`;
    this.modalType ='reportCompany';
    this._modal.open();
  }

    isCompanyBlocked(event){
         if(event){
          this.companiesList.splice(this.companyIndex,1);
         }
    }

  // report block ends

  openSmallChatBox(user) {
    let {fName,lName,avatar,id } = user

    let mutation = this.globalUserProService.isCompanyActive() ?
                    this.userProfileService
                        .openSmallChatBoxForComapny({
                            avatar , 
                            name:`${fName} ${lName}` , 
                            id , 
                            companyId:this.globalUserProService.getComapnyId()
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

    openReview(item){
    this.modalType = 'write';
    this.companyReview = item.id;
    this._modal.title = `Write a Review to ${item.name}`
    this._modal.open();
    }


// ****  Get company folling companies ****
  getFollowsCompaniesOfCompany(){
    return this.companyProfileService
    .getFollowsCompaniesOfCompany(this.companyId)
    .subscribe((data)=> {
      data['getFollowsCompaniesOfCompany'].profiles.map((item,ind) => {
        if( this.dontRepeatConQuery ){ 
          (this.connectionsForm.controls.checkbox as FormArray).push( 
            this.fb.control('') 
          ); 
          item.index = ind;  
        } 
        this.companyFollowingCompanies = item;
      })
      this.companyFollowingCompanies = data['getFollowsCompaniesOfCompany'].profiles;
    })
  }

  ngOnDestroy(): void {
    this.getFollowsCompaniesOfCompany().unsubscribe();
  }

}
