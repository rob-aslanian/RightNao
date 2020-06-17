import { Component, OnInit, HostListener, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Connections } from '../../_shared/graphql/network/connections';
import { map, debounceTime, takeUntil } from 'rxjs/operators';
import {RecommendationService} from '../../_shared/services/recommendation.service';
import {AppModalComponent} from '../../_shared/components/app-modal/app-modal.component';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
import { AppComponent } from 'src/app/app.component';
import { SaveToPDFComponent } from 'src/app/_shared/components/save-to-pdf/save-to-pdf.component';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-network-connections',
  templateUrl: './network-connections.component.html',
  styleUrls: ['../../_shared/css/modals_shared_styles.scss','./network-connections.component.scss'],
  host: {
    class: "netowrk-custom-col"
  }
  
})
export class NetworkConnectionsComponent implements OnInit {



// Alert about add or remove category to user
alertType: string;
alertData: {
  name: string,
  avatar: string
};
 showAlert(firstName: string, lastName:string, avatar: string) {
   this.alertData = {
     name: `${firstName} ${lastName}`,
     avatar
   }
 } 
// Alert about add or remove category to user



destroy$:Subject<any> = new Subject<any>();
isLoaded = true;
private _userId; 
  isChecked: boolean;
  sizeName: any;
  selectedUser: any;
  connectionType: boolean;
  isContact: boolean;

  @Input()  set userId(value){
      this._userId = value;
  }; 

            get userId(){
              return this._userId;
            }

  cheeked:boolean = true;
  selectedCatAndScat: any;
  toggle:any;
  connectionsList:any[] = [];
  userConnections:any[] = []; 
  allCategoriesCouter:any = [];
  allCategoriesList:object;
  connListlength:number;
  isSelectedConn:any;
  dontRepeatConQuery:boolean = true;
  selectedItem:any;
  changeConnLength:boolean = true;
  selectedCategory:string = "";
  conversationId:string = null;
  // formGroups
  checks:boolean = true;
  selectedArr = [];
  connectionsForm: FormGroup;
  checkAllConnForm: FormGroup;
  removeFavourites:boolean = false;
  allCatFrAFmForm: FormGroup;
  allCatWorkForm: FormGroup;
  allCatBusinessForm: FormGroup;
  allCatOtherForm: FormGroup;
  searchForm: FormGroup;
  isSelected:boolean = false;
  minus:boolean = false;
  index: any;
  isSelectedH:boolean = true;
  modalType: string;
  reportBlockUer;
  imgUrlObject: any;
  indexPdf: any;
  indexInfo: any;
  recommendIndex: any;
  reportIndex: any;
  isOnInit = true;
    
  allCategoriesSize:any = {
    business:0,
    favourites:0,
    friends_and_family:0,
    not_categorized:0,
    other:0,
    work:0
  };

  constructor(

    private apollo: Apollo,
    private fb:FormBuilder,
    private recomm:RecommendationService,
    private networkService:NetworkUserService,
    private appcomponent: AppComponent,
    private activeRouter:ActivatedRoute

  ) { }

  @HostListener("document:click", ["$event.target"]) function(e: HTMLElement) {
    if (!e.classList.contains("btn-more") &&  this.toggle['main']['active'][this.toggle['main']["selected"]] && this.isSelectedH) {
      this.toggle['main']['active'][this.toggle['main']["selected"]]  = ! this.toggle['main']['active'][this.toggle['main']["selected"]] ;
      this.toggle['main']['active'][this.toggle['main']["selected"]] = false;
        }
  }
  

  @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent
  @ViewChild(SaveToPDFComponent, { static: false }) pdf:SaveToPDFComponent

  ngOnInit() {


    this.isContact =  this.activeRouter.snapshot.data && this.activeRouter.snapshot.data.type === 'contacts' ?  true : false; 
    
    
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
        card: false,
        list: true
      },
      sort: {
        selectedText: '',
        selected: "",
        first_name: false,
        last_name: false,
        recently_added: false
      },

      subNavSelected: []
    }
    // make active class for all categories
    this.toggle["subNavSelected"]["all"] = true;

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

    // add sub categories forms building
    this.allCatFrAFmForm = this.fb.group({
      addCategory: ['']
    });
    this.allCatWorkForm = this.fb.group({
      addCategory: ['']
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
        this.mainQuery(val,this.selectedCategory,this.toggle.sort.selected);
        
      this.isLoaded = true;
      }
    },);

    // Query
    this.mainQuery("","","recently_added");


   this.networkService.getCategoryTree().subscribe((success:any)=>{
      let data = success.data.GetCategoryTree;
      this.allCategoriesList = {
          favorite: data.find( item => item.unique_name === 'favorite' ),
          friends_and_family: data.find( item => item.unique_name === 'friends_and_family' ),
          work: data.find( item => item.unique_name === 'work' ),
          business: data.find( item => item.unique_name === 'business' ),
          other: data.find( item => item.unique_name === 'other' )
      }
    });

  }

     //report-block
  isBlockedUser(event){
      if(event){
      this.connectionsList.splice(this.reportIndex,1);         
    }
}
     close(event){
     if(event){
            this._modal.close();
     }
    }

    reportBlock(user,index){
      if(user){
        let input = {
          avatar:user['avatar'],
          id:user['id'],
          firstname:user['first_name'],
          lastname:user['last_name'],
     }
      this.reportBlockUer = input; 
      this.modalType = 'reportBlock';
      this._modal.open();
      this._modal.title =  'What you can do';
      this.reportIndex = index;
    }
         
      }

  // get friendships query
  mainQuery(query,category,sort_by ){

  this.networkService.getContacts( query,category,sort_by, this.isContact ) .subscribe((data:any) => {

           
        this.dontRepeatConQuery = true;
        // this.changeConnLength ? this.connListlength = data.length : null;
        // let connLength = data.length;

        this.isLoaded = false;
        console.log(data, this.isContact);
        
        
        this.modifyQuery(data, category );
        // this.changeConnLength = false;
      }, 
      (err) => { this.isLoaded = false },
      () => { this.isLoaded = false });
 
  }


  // modify query
  modifyQuery(data , categorie? ){
    this.connectionsList = [];
    // this.allCategoriesCouter = [];
  Object.keys( this.allCategoriesSize ).map( cat => {
      this.allCategoriesSize[cat] = 0;
  } )
     
   this.allCategoriesSize[categorie] = 0;
   
  
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
 
         if( category ){

           
              this.allCategoriesSize[category]++;
              
         }
        
              
          item["cat"][cat] = true;
          item["cat"][category] = true;       
        // this.allCategoriesSize[category]++;
      });

      this.connectionsList.push(item);
    });
    this.dontRepeatConQuery = false;    
    this.checkisContact();
  }

 


  // toggle function
  myToggle( index,type?:string ){
 
    this.index = index;
    
    type ? type : type = "main";
    this.toggle[type]['active'][index] = !this.toggle[type]['active'][index];
 
    if( this.toggle[type]["selected"] != index ){
      this.toggle[type]['active'][this.toggle[type]["selected"]] = false;
    }
 
    this.toggle[type]["selected"] = index;
    index == 'favorite'?this.checkAllConnForm.get('check').reset():null;
  }

  // toggle function for sort and view
  sort_and_wiew(event,type:string,itm?:string){
    let toggle = this.toggle;
    if(itm){
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

  get FrAFmForm(){ return this.allCatFrAFmForm.controls }
  get WorkForm(){ return this.allCatWorkForm.controls }
  get BusinessForm(){ return this.allCatBusinessForm.controls }
  get OtherForm(){ return this.allCatOtherForm.controls }

  // add connections sub category
  addCategoryEvent(parentt){
    let value;
    let form;
    switch (parentt) {
      
      case "friends_and_family":
      value = this.FrAFmForm.addCategory.value;
      form = this.FrAFmForm.addCategory;
      break;
      case "work":
      value = this.WorkForm.addCategory.value;
      form = this.WorkForm.addCategory;
      break;
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
 
      
      this.networkService
    .createCategories(value,parentt)
      .subscribe(data => {
        this.allCategoriesList[parentt]['children'].push({
          name: value,
          unique_name: parentt+"__"+value
        });
        form.reset();
      });
    }
  }
  getRecommend(type,index){

     if(type === 'ask'){
      this.recommendIndex = index;
      this.modalType = 'ask';
      this._modal.title = 'Ask for a recommendation';
      this._modal.open();
    }

    else if(type === 'recommend'){
      this.recommendIndex = index;
      this._modal.title = 'Write a recommendation';  
      this.modalType = 'recommend';
      this._modal.open();
    }

  }
   getResult(event){

     let type = event._type;
     let { user_id, text } = event;

     let input = {
        user_id:user_id,
        text:text
      };
  
     if(type === 'recommend'){
          this.recomm
          .writeRecommendation(input)
          .subscribe(data => {
             
          });
          this._modal.close();
     }
    else if(type === 'ask'){
          this.recomm
          .askRecomendation(input)
           .subscribe(data => {
              
           })
          ;
          this._modal.close();
     }

   }
  // Filter data whith categories
  subCategoryEv(name){
    this.connectionsList = [];
    this.dontRepeatConQuery = true;
    this.connectionsForm.removeControl("checkbox");
    this.connectionsForm.setControl("checkbox",this.fb.array([]));
    this.selectedCategory = name;
    this.sizeName = name;
    
    let splited = name.split("__");
    this.toggle["subNavSelected"] = [];
    this.toggle["subNavSelected"][splited[0]] = true;
    this.toggle['main']['active'][this.toggle['main']['selected']] = false;

    let replaceTwodash = name.replace("__"," - ");
    let replacedash = replaceTwodash.replace(/_/g," ");
    this.selectedCatAndScat = replacedash;

    this.mainQuery("",name,this.toggle.sort.selected);
    
    
  }

  // remove connections sub category
  removeSubCategory(event,unique_name){
    event.stopPropagation();
    let splited = unique_name.split("__");
    let parent = splited[0];
    let name = splited[1];
    
    this.networkService.RemoveCategory(name,parent)
       .subscribe(data => {
          this.connectionsList.map(item => {
            let findIndex = this.allCategoriesList[parent]["children"].findIndex( Uname => Uname.unique_name == unique_name );
            findIndex >= 0 ? this.allCategoriesList[parent]["children"].splice(findIndex,1) : null;
            let checked = item.categories.find(cat => cat == unique_name);
            
            if( typeof checked != "undefined" ){
              this.toggleCategoryToUser(unique_name,item.friend_profile.id,'RemoveFromCategory');
            }
       });
     });

  }

  // add or remove category to user
  toggleCategoryToUser(name,id?,eventType?){ 


//  this.connectionsForm.reset();
 this.removeFavourites = true;
   let itemId = [];
    if(id){
   itemId.push(id);
    }else{
      let value = this.cnform.checkbox.value;
      value.map( (item,index) =>{
        let findedCategories = this.connectionsList.find( some => some.index === index && item );
        typeof findedCategories != "undefined" ? itemId.push(findedCategories.friend_profile.id) : null;
      });
    }
    
    itemId.map(userId => {
      let whatEvent;
      let FindItem = this.connectionsList.find( item => item.friend_profile.id === userId );
      let checkFinded = FindItem.categories.find( some => some === name );

      if( eventType ){
        if( eventType == "RemoveFromCategory" ){
          this.removeFavourites = false;
          whatEvent = Connections[eventType];
        }else{
          whatEvent = (typeof checkFinded === "undefined") ? Connections[eventType] : false;
        }
      }else{
        whatEvent = (typeof checkFinded === "undefined") ? Connections.AddToCategory : Connections.RemoveFromCategory;
      }
      
      
      if( whatEvent != false ){
        this.apollo.mutate({
          mutation: whatEvent,
          variables: {
            "userId": FindItem.friend_profile.id,
            "category_name": name
          }
        }).subscribe(({data}) => {
          if( typeof data.AddToCategory === "undefined" ){
            let callBackId = data.RemoveFromCategory.user_id;
            let callBackname = data.RemoveFromCategory.unique_name;
            let findItemIndex = this.connectionsList.findIndex( item => item.friend_profile.id == callBackId );
            let findCatIndex = this.connectionsList[findItemIndex].categories.findIndex( item => item === callBackname );
            this.connectionsList[findItemIndex]["categories"].splice(findCatIndex,1);
            let findNotCatIndex = this.connectionsList[findItemIndex].categories.findIndex( item => item === "not_categorized" );
            findNotCatIndex >= 0 ? this.connectionsList[findItemIndex]["categories"].splice(findNotCatIndex,1) : null;
            this.connectionsList[findItemIndex]["categories"]["cat"] = [];
            // this.connectionsForm.reset();
          }else{

            let callBackId = data.AddToCategory.user_id;
            let callBackname = data.AddToCategory.unique_name;
            let findItemIndex = this.connectionsList.findIndex( item => item.friend_profile.id == callBackId );
            let findNotCatIndex = this.connectionsList[findItemIndex].categories.findIndex( item => item === "not_categorized" );
            findNotCatIndex >= 0 ? this.connectionsList[findItemIndex]["categories"].splice(findNotCatIndex,1) : null;
            this.connectionsList[findItemIndex]["categories"].push(callBackname);
            this.connectionsList[findItemIndex]["categories"]["cat"] = [];

          }
          this.modifyQuery(this.connectionsList);
          // this.connectionsForm.reset();
        });

      }

    });


  }

  // remove all category from user
  removeAllCatFromUser(id?){

    let itemId = [];
    if(id){
      itemId.push(id);
    }else{
      let value = this.cnform.checkbox.value;
      value.map( (item,index) =>{
        let findedCategories = this.connectionsList.find( some => some.index === index && item );
        typeof findedCategories != "undefined" ? itemId.push(findedCategories.friend_profile.id) : null;
      });
    }
   this.networkService.BatchRemoveFromCategory(itemId)
    .subscribe(responce => {
      itemId.map( userID => {
        let FindItemIndex = this.connectionsList.findIndex( item => item.friend_profile.id === userID );
        this.connectionsList[FindItemIndex]['categories'] = ["not_categorized"];
      });
      this.modifyQuery(this.connectionsList);

    });

  }


 
  follow( id: string, idx:number): void {

       this.networkService
        .followUser(id)
         .subscribe(data => {
             this.connectionsList[idx]["following"] = true;
         })


  }
  unfollow( id: string, idx:number ): void {
    
      this.networkService
       .unfollowUser(id) 
        .subscribe( data => {
          this.connectionsList[idx]["following"] = false;
        })
   
  }
  // custom modal open function

  // custom modal close function
  closeModal(event){
    event.preventDefault();
    this.toggle.main.active[this.toggle.main.selected] = false;
   this.isSelectedH = true
  }


  infoView(index){
  this.indexInfo = index;



  }
 
  clickedCheckbox(e){


   if(e.target.checked){
     this.selectedArr.push('selected');
     
         this.minus = true;
   
       }
      else{
        this.selectedArr.pop();
        
           this.minus = false;

      } 
 }
 resetFormCheck(){
 
    this.selectedArr = [];
    this.connectionsForm.get('checkbox').reset()
    this.checkAllConnForm.get('check').reset();
    this.minus = false;

   }
    disconnect(id: string, idx: number){
       
      this.networkService
       .Unfriend(id)
        .subscribe(responce => {
          
        this.connectionsList.splice( idx ,1);
        // this.connListlength = this.connectionsList.length;
        // this.modifyQuery(this.connectionsList);
        
      });
    }
    saveToPDF( user:any ){
      
      this.selectedUser =  user ;
      
       setTimeout(() => this.pdf.saveCV() , 200);
    }




      imgUrl(event){     
        this.imgUrlObject = event ;    
      }
      openSmallChatBox(user:(any | object)):void{

         let { avatar,first_name,last_name,id  } = user;

            let name = `${first_name} ${last_name}`;
            let avatarUser = avatar?`/file/${avatar}`:'assets/img/124.svg';
            let participants = {
                 id:id,
                 is_company:false,
                 is_admin:false
            }

            this.networkService
              .CreateConversationUser(name,avatarUser,participants)   
                .subscribe(data => {

                  let chatId = data.data.CreateConversation.id;
                  this.appcomponent.addChatBox(chatId);
           
             })
          }
          changeCheck(){
                this.isChecked = true;
               
          }
          resetFormCheckBox(){
            this.connectionsForm.get('checkbox').reset()
            this.checkAllConnForm.get('check').reset();
          }

      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();

        
      }
      checkisContact() {
         this.connectionsList.map( (user, i) => {
                if( this.isContact ) {
                  if(  user.cat && typeof user.cat === 'object' && user.cat.not_categorized ) {
                    this.alertType = 'connections';                   
                       this.connectionsList.splice( i, 1 );
                   }
                } else  {
                  if(  user.cat && typeof user.cat === 'object' && !user.cat.not_categorized ) {
                    this.alertType = 'contacts';                   
                         this.connectionsList.splice( i, 1 );
                         
                  }    
                }
               
         } )
      }
    }
