import { Component, OnInit,HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Apollo } from 'apollo-angular';

import { Followers } from '../../../_shared/graphql/network-company/followers';
import { Observable, Subject } from 'rxjs';
import { map, debounceTime, takeUntil } from 'rxjs/operators';
import { GlobalUserProService } from '../../../_shared/services/global-user-pro.service';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { AppComponent } from 'src/app/app.component';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';

import { SaveToPDFComponent } from 'src/app/_shared/components/save-to-pdf/save-to-pdf.component';

@Component({
  selector: 'app-company-followers-people',
  templateUrl: './followers-people.component.html',
  styleUrls: ['../../../_shared/css/modals_shared_styles.scss','./followers-people.component.scss']
})

export class FollowersPeopleComponent implements OnInit {

  destroy$:Subject<any>= new Subject<any>();

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;
  @ViewChild(SaveToPDFComponent, { static: false }) pdf:SaveToPDFComponent;

  toggle:any;
  connectionsList:any[] = [];
  connListlength:number;
  isSelectedConn:any;
  dontRepeatConQuery:boolean = true;
  selectedItem:any;
  searchForm: FormGroup;
  companyID: string;
  isLoaded: boolean = true;
  
  // formGroups
  connectionsForm: FormGroup;
  checkAllConnForm: FormGroup;

  WYCDForm: FormGroup;
  imgUrlObject: any;
  selectedUser: any;
  modalType: string;
  userId :string; 
  constructor(
    private apollo: Apollo,
    private fb:FormBuilder,
    private globalUserProfileService: GlobalUserProService,
    private utilService:UtilsService,
    private appComponent:AppComponent
  ) { }




  ngOnInit() {

    // get Company id
    this.companyID = this.globalUserProfileService.getCompanyProfile().id;
    this.userId = this.globalUserProfileService.getUserProfile().id; 
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
    this.searchForm.get("search").valueChanges.pipe(debounceTime(700)).subscribe((val) => {
      if(this.searchForm.get("search").valid || val.trim() == ""){
        this.isLoaded = true;
        this.mainQuery(val);
      }
    });

    this.mainQuery("");

  }
  
  // Query
  mainQuery(query){
    let mainQuery:Observable<any> = this.apollo.watchQuery({
      fetchPolicy: "network-only",
      query: Followers.getFollowersForCompany,
      variables: {
        "companyId": this.companyID,
        "query":query,
        "category": "",
        "letter": "",
        "sort_by": "recently_added",
        "companies": []
      }
    }).valueChanges.pipe(map( 
      (data:any) => data.data.getFollowersForCompany
    ));
    
    let mainQuerySubscribed = mainQuery.subscribe((data:any) => {
      // add formgroup in connectionForm
      this.dontRepeatConQuery = true;
      this.connListlength = data.length;
      this.connecTionQuery(data);
      this.isLoaded = false;
      mainQuerySubscribed.unsubscribe();
    }, 
    (err) => { this.isLoaded = false },
    () => { this.isLoaded = false });
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
    // console.log(this.connectionsList);    
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
        let findedUser = this.connectionsList.find( some => some.index === index && item );
        typeof findedUser != "undefined" ? itemId.push(findedUser) : null;
      });
    }
    
    itemId.map(user => {
      
      this.apollo.mutate({
        mutation: Followers.FollowForCompany,
        variables: {
          "companyId": this.companyID,
          "userId": user.user_profile.id,
        }
      }).subscribe(({data}) => {
        let findedIndex = this.connectionsList.findIndex( item => item.user_profile.id == user.user_profile.id );
        this.connectionsList[findedIndex].following = true;
      });
    });
  }

 
  closeModal(event){
    event.preventDefault();
    this.toggle.main.active[this.toggle.main.selected] = false;
  }

  open(type:string , user){
    this.modalType = type;
    this.modal.open();

    this.selectedUser = user;
    this.modal.title = `Report ${user.first_name}`;
  }

  saveToPDF(user){
    this.selectedUser = user;

    setTimeout(() => this.pdf.saveCV() , 200);
 
   
  }

  openSmallChatBox(user) {
    let { first_name , last_name , 
          avatar , id} = user;
     
     this.utilService
     .openSmallChatBoxForComapny({
         avatar , 
         name:`${first_name} ${last_name}` , 
         id , 
         companyId:this.companyID || this.userId
       })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ({data}) => {
        let chatId = data.CreateConversationForCompany.id; /// Company 
                    
        this.appComponent.addChatBox(chatId);
       },
       (err) => {

 
         if(err.message.endsWith('you_can_not_write_to_this_person')){
           
         }
       }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }




}
