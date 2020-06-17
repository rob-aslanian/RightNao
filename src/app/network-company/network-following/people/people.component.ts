import { Component, OnInit,HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Apollo } from 'apollo-angular';

import { Following } from '../../../_shared/graphql/network-company/following';
import { Observable, Subject } from 'rxjs';
import { map, debounceTime, takeUntil } from 'rxjs/operators';
import { GlobalUserProService } from '../../../_shared/services/global-user-pro.service';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { AppComponent } from 'src/app/app.component';
import { SaveToPDFComponent } from 'src/app/_shared/components/save-to-pdf/save-to-pdf.component';

@Component({
  selector: 'app-company-following-people',
  templateUrl: './people.component.html',
  styleUrls: ['../../../_shared/css/modals_shared_styles.scss','./people.component.scss']
})
export class PeopleComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;
  @ViewChild(SaveToPDFComponent, { static: false }) pdf:SaveToPDFComponent;

  companyID:string;
  toggle:any;
  connectionsList:any[] = [];
  connListlength:number;
  isSelectedConn:any;
  dontRepeatConQuery:boolean = true;
  selectedItem:any;
  searchForm: FormGroup;
  
  // formGroups
  connectionsForm: FormGroup;
  checkAllConnForm: FormGroup;

  WYCDForm: FormGroup;
  isSelected: boolean;
  imgUrlObject: any;
  selectedUser:any;
  modalType:string;

  destroy$:Subject<any> = new Subject<any>();

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

    this.searchForm = this.fb.group({
      search: ['',[Validators.required,Validators.minLength(3)]]
    });

    // select all connections checkbox form
    this.checkAllConnForm = this.fb.group({
      check: ['']
    });

    this.WYCDForm = this.fb.group({
      block_report: ['']
    })



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
        this.mainQuery(val);
      }
    });

    this.mainQuery("");

  }

  
  open(type:string , user){
    this.modalType = type;
    this.modal.open();

    this.selectedUser = user;
    this.modal.title = `Report ${user.first_name}`;
  }

  // get following people query
  mainQuery(query){
    // Query
    let mainQuery:Observable<any> = this.apollo.watchQuery({
      fetchPolicy: "network-only",
      query: Following.getFollowingsPeople,
      variables: {
        "companyId": this.companyID,
        "query": query,
        "category": "",
        "letter": "",
        "sort_by": "recently_added",
        "companies": []
      }
    }).valueChanges.pipe(map( 
      (data:any) => data.data.getFollowingsForCompany
    ));
    
    let mainQuerySubscribed = mainQuery.subscribe((data:any) => {
      // add formgroup in connectionForm
      this.connListlength = data.length;
      this.dontRepeatConQuery = true;
      this.connecTionQuery(data);
      mainQuerySubscribed.unsubscribe();
    });
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
    console.log('items');
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



  unfollow(userItem?){
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
        mutation: Following.Unfollow,
        variables: {
          "companyId": this.companyID,
          "userId": user.user_profile.id,
        }
      }).subscribe(({data}) => {
        let findedIndex = this.connectionsList.findIndex( item => item.user_profile.id == user.user_profile.id );
        this.connectionsList.splice(findedIndex,1);
        this.connListlength = this.connectionsList.length;
      });
    });
  }


  closeModal(event){
    event.preventDefault();
    this.toggle.main.active[this.toggle.main.selected] = false;
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
          companyId:this.globalUserProfileService.getComapnyId()
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
