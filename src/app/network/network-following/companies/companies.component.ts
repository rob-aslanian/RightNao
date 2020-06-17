import { Component, OnInit,HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { GlobalUserProService } from '../../../_shared/services/global-user-pro.service';
import { Following } from "../../../_shared/graphql/network/following";
import { graphqlUserProfile } from 'src/app/_shared/graphql/user-profile';
import { AppComponent } from "../../../app.component";
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['../../../_shared/css/modals_shared_styles.scss','./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent;
  isLoaded: boolean = true;
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
  math = Math
  utils = utilities;

  allCatBusinessForm: FormGroup;
  allCatOtherForm: FormGroup;
  isSelected:boolean = true;
  WYCDForm: FormGroup;
  companyId:string;
  review:boolean = true;
  companyReport: any;
  companyReview: any;
  companyIndex: any;
  constructor(

    private apollo: Apollo,
    private fb:FormBuilder,
    private appcomponent:AppComponent,
    private networkService:NetworkUserService
  ) { }

  @HostListener("document:click", ["$event.target"]) function(e: HTMLElement) {
    if (!e.classList.contains("btn-more") &&  this.toggle['main']['active'][this.toggle['main']["selected"]] && this.isSelected ) {
      this.toggle['main']['active'][this.toggle['main']["selected"]]  = ! this.toggle['main']['active'][this.toggle['main']["selected"]] ;
      this.toggle['main']['active'][this.toggle['main']["selected"]] = false;
        }}
 
  ngOnInit() {
 
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
        selectedText: '',
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


    // Search form valuechanges
    this.searchForm.get("search").valueChanges.pipe(debounceTime(700)).subscribe((val) => {
      if(this.searchForm.get("search").valid || val.trim() == ""){
        this.isLoaded = true;
        this.mainQuery(val,this.selectedCategory,this.toggle.sort.selected);
      }
    });


    // Query
    this.mainQuery("","","recently_added");


    this.networkService.getFollowingsCategoryTree()
      .subscribe((success:any)=>{
        let data = success.data.GetFollowingsCategoryTree;
        this.allCategoriesList = {
          favorite: data.find( item => item.unique_name === 'favorite' ),
          business: data.find( item => item.unique_name === 'business' ),
          other: data.find( item => item.unique_name === 'other' )
        }
    });

    

  }

  // get friendships query
  mainQuery(query,category,sort_by){
    let mainQuery:Observable<any> = this.networkService
    .getFollowingCompanies( query, category, sort_by ).pipe(map( 
      (data:any) => data.data.getFollowingCompanies
    ));
    
    let mainQuerySubscribed = mainQuery.subscribe((data:any) => {
      this.dontRepeatConQuery = true;
      this.changeConnLength ? this.connListlength = data.length : null;
      let connLength = data.length;
      
      this.modifyQuery(data);
      mainQuerySubscribed.unsubscribe();
      this.changeConnLength = false;
      this.isLoaded = false;
    }, 
    (err) => { this.isLoaded = false },
    () => { this.isLoaded = false } );

  }

  modifyQuery(data){
    this.companiesList = [];
    this.allCategoriesCouter = [];

    data.map((item,ind)=>{
      // add unic index
      if( this.dontRepeatConQuery ){
        (this.connectionsForm.controls.checkbox as FormArray).push(
          this.fb.control('')
        );
        item.index = ind;
      }
      let conn = item;
      item["cat"] = [];

      // counting categories
      if( conn.categories.length == 0 ){ conn.categories.push("not_categorized"); }
      
      conn.categories.map( cat => {
        let category = cat.split("__")[0];
        if( typeof this.allCategoriesCouter[category] === "undefined" ){
          this.allCategoriesCouter[category] = 1;
        }else if (typeof item["cat"][category] === "undefined") {
          this.allCategoriesCouter[category]++;
        }
        item["cat"][cat] = true;
        item["cat"][category] = true;
      });
      this.companiesList.push(item);
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

      if( type == 'sort' ){
        this.sort_by(itm,type,event);
      }
      
    }
  }


  // function for sort items
  sort_by(itm,type?,event?){
    this.mainQuery("",this.selectedCategory,itm);
    if(event && type){
      this.toggle[type]['selectedText'] = event.target.innerText;
    }
  }



  // shortage for forms names

  get cnform(){ return this.connectionsForm.controls }

  get BusinessForm(){ return this.allCatBusinessForm.controls }
  get OtherForm(){ return this.allCatOtherForm.controls }
  get wydForm(){ return this.WYCDForm.controls }



  addCategoryEvent(parentt){
    let value;
    let form;
    switch (parentt) {
      case "business":
      value = this.BusinessForm.addCategory.value;
      form = this.BusinessForm.addCategory;
      break;
      case "other":
      value = this.OtherForm.addCategory.value;
      form = this.OtherForm.addCategory;
      break;
      
      default:
      value = false;
        break;
    }
    if( value ){
 
      this.networkService.CreateFollowingsCategory(value , parentt)
      .subscribe(data => {
        this.allCategoriesList[parentt]['children'].push({
          name: value,
          unique_name: parentt+"__"+value
        });
        form.reset();
      });
    }
  }

  

  subCategoryEv(name){
    
    this.companiesList = [];
    
    this.dontRepeatConQuery = true;

    this.connectionsForm.removeControl("checkbox");
    this.connectionsForm.setControl("checkbox",this.fb.array([]));

    let splited = name.split("__");
    this.toggle["subNavSelected"] = [];
    this.toggle["subNavSelected"][splited[0]] = true;
    this.toggle['main']['active'][this.toggle['main']['selected']] = false;

    let replaceTwodash = name.replace("__"," - ");
    let replacedash = replaceTwodash.replace(/_/g," ");
    this.selectedCatAndScat = replacedash;

    this.selectedCategory = name;
    this.mainQuery("",name,this.toggle.sort.selected);
    
  }

  removeSubCategory(event,unique_name){
    event.stopPropagation();
    let splited = unique_name.split("__");
    let parent = splited[0];
    let name = splited[1];
    
     this.networkService
     .RemoveFollowingsCategory( name , parent)
        .subscribe(data => {
        this.companiesList.map(item => {
          let findIndex = this.allCategoriesList[parent]["children"].findIndex( Uname => Uname.unique_name == unique_name );
          findIndex >= 0 ? this.allCategoriesList[parent]["children"].splice(findIndex,1) : null;
          let checked = item.categories.find(cat => cat == unique_name);
          
          if( typeof checked != "undefined" ){
            this.toggleCategoryToUser(unique_name,item.friend.id,'RemoveFromCategory');
          }
        });
      });

  }

  toggleCategoryToUser(name,id?,eventType?){
    let itemId = [];
    if(id){
      itemId.push(id);
    }else{
      let value = this.cnform.checkbox.value;
      value.map( (item,index) =>{
        let findedCategories = this.companiesList.find( some => some.index === index && item );
        typeof findedCategories != "undefined" ? itemId.push(findedCategories.company_profile.id) : null;
      });
    }
    
    itemId.map(companyId => {
      let whatEvent;
      let FindItem = this.companiesList.find( item => item.company_profile.id === companyId );
      let checkFinded = FindItem.categories.find( some => some === name );

      if( eventType ){
        if( eventType == "RemoveFromCategory" ){
          whatEvent = Following[eventType];
        }else{
          whatEvent = (typeof checkFinded === "undefined") ? Following[eventType] : false;
        }
      }else{
        whatEvent = (typeof checkFinded === "undefined") ? Following.AddToFollowingsCategory : Following.RemoveFromFollowingsCategory;
      }
      
      
      if( whatEvent != false ){
        this.apollo.mutate({
          mutation: whatEvent,
          variables: {
            "companyId": FindItem.company_profile.id,
            "category_name": name
          }
        }).subscribe(({data}) => {
          if( typeof data.AddToFollowingsCategory === "undefined" ){
            let callBackId = data.RemoveFromFollowingsCategory.company_id;
            let callBackname = data.RemoveFromFollowingsCategory.unique_name;
            let findItemIndex = this.companiesList.findIndex( item => item.company_profile.id == callBackId );
            let findCatIndex = this.companiesList[findItemIndex].categories.findIndex( item => item === callBackname );
            this.companiesList[findItemIndex]["categories"].splice(findCatIndex,1);
            let findNotCatIndex = this.companiesList[findItemIndex].categories.findIndex( item => item === "not_categorized" );
            findNotCatIndex >= 0 ? this.companiesList[findItemIndex]["categories"].splice(findNotCatIndex,1) : null;
            this.companiesList[findItemIndex]["categories"]["cat"] = [];
          }else{
            let callBackId = data.AddToFollowingsCategory.company_id;
            let callBackname = data.AddToFollowingsCategory.unique_name;
            let findItemIndex = this.companiesList.findIndex( item => item.company_profile.id == callBackId );
            let findNotCatIndex = this.companiesList[findItemIndex].categories.findIndex( item => item === "not_categorized" );
            findNotCatIndex >= 0 ? this.companiesList[findItemIndex]["categories"].splice(findNotCatIndex,1) : null;
            this.companiesList[findItemIndex]["categories"].push(callBackname);
            this.companiesList[findItemIndex]["categories"]["cat"] = [];
          }
          this.modifyQuery(this.companiesList);

        });

      }

    });


  }

  removeAllCatFromUser(id?){

    let itemId = [];
    if(id){
      itemId.push(id);
    }else{
      let value = this.cnform.checkbox.value;
      value.map( (item,index) =>{
        let findedCategories = this.companiesList.find( some => some.index === index && item );
        typeof findedCategories != "undefined" ? itemId.push(findedCategories.company_profile.id) : null;
      });
    }
  this.networkService.BatchRemoveFromFollowingsCategory(itemId)
  .subscribe(responce => {

      itemId.map( companyId => {
        let FindItemIndex = this.companiesList.findIndex( item => item.company_profile.id === companyId );
        this.companiesList[FindItemIndex]['categories'] = ["not_categorized"];
      });
      this.modifyQuery(this.companiesList);

    });

  }
 
  unfollow(id: string, idx: number ): void {
    
       this.networkService
       .unfollowCompany(id)
        .subscribe(data => {
           this.companiesList.splice(idx, 1)
        })

  }



  close(event){
    if(event){
      this._modal.close();
    }
  
  }
 
  //  report block start
  reportCompany(item:object,index){
 
    
    this.companyIndex = index;
    this.companyReport =  item;
    this._modal.title = 'Report Company';
    this.modalType ='reportCompany';
    this._modal.open();
  }
    isCompanyBlocked(event){
         if(event){
          this.companiesList.splice(this.companyIndex,1);
         }
    }
  // report block ends
  openSmallChatBox( company: any  ): void {
  
   let { name , avatar , id  } = company;


   this.networkService
   .CreateConversationUser(
      name, 
      avatar ? 'file'+avatar : 'assets/img/default-company.svg',
      {
        id,
        is_company: true,
        is_admin: false
      }
    ) .subscribe((data: any) => {
          let chatId = data.data.CreateConversation.id;
          this.appcomponent.addChatBox(chatId);
        });
    }

    openReview(item){
    this.modalType = 'write';
    this.companyReview = item.company_profile.id;
    this._modal.title = "Write a Review"
    this._modal.open();
    }


}
