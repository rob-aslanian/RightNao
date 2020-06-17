import { Component, OnInit,HostListener, ViewChild, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, debounceTime, takeUntil } from 'rxjs/operators';
import { GlobalUserProService } from '../../../_shared/services/global-user-pro.service';
import { AppComponent } from "../../../app.component";
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { SaveToPDFComponent } from 'src/app/_shared/components/save-to-pdf/save-to-pdf.component';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['../../../_shared/css/modals_shared_styles.scss','./people.component.scss', '../../network.component.scss'] 
})
export class PeopleComponent implements OnInit , OnDestroy {
 
  @Input() hideFilters:boolean = false;

  isLoaded:boolean = true;

  toggle:any;
  connectionsList:any[] = [];
  connListlength:number;
  isSelectedConn:any;
  dontRepeatConQuery:boolean = true;
  selectedItem:any;
  searchForm: FormGroup;
  click = false;
  // formGroups
  connectionsForm: FormGroup;
  checkAllConnForm: FormGroup;
  reportingtUser:object;
  WYCDForm: FormGroup;
  isSelected:boolean = true;
  reportUserForm:FormGroup;
  userId
  selectTextArea:boolean = false;
  savePDF: MouseEvent;
  imgUrlObject: any;
  index: any;
  modalType: string;
  reportBlockUer: { avatar: any; id: any; firstname: any; lastname: any; };
  reportIndex: any;

  userConnections: any = [];
  selectedUser: any;
  $destroy:Subject<any> = new Subject<any>();

  constructor(
    private fb:FormBuilder,
    private globalService:GlobalUserProService,
    private appcomponent: AppComponent,
    private networkService: NetworkUserService

  ) { }



  @HostListener("document:click", ["$event.target"]) function(e: HTMLElement) {
    if (!e.classList.contains("btn-more") &&  this.toggle['main']['active'][this.toggle['main']["selected"]] && this.isSelected) {
      this.toggle['main']['active'][this.toggle['main']["selected"]]  = ! this.toggle['main']['active'][this.toggle['main']["selected"]];

        }}

  @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent
  @ViewChild(SaveToPDFComponent, { static: false }) pdf:SaveToPDFComponent
        
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

   this.reportUserForm = this.fb.group({
      report:['',Validators.required],
      textArea:['']
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

    this.userId = this.globalService.getUserProfile().id;
    // Search form valuechanges
    this.searchForm.get("search").valueChanges.pipe(debounceTime(700)).subscribe((val) => {
      if(this.searchForm.get("search").valid || val.trim() == ""){
        this.isLoaded = true;
        this.mainQuery(val);
      }
    });

    this.mainQuery("");
  }

   //controls
 get reportControls(){
   return  this.reportUserForm.controls 
 }


  // get following people query
  
  mainQuery(query){
    // Query
    
    let mainQuery:Observable<any> =  this.networkService.getFollowingsPeople(query)
    .pipe(map( 
      (data:any) => data.data.getFollowings
    ));
    
    let mainQuerySubscribed = mainQuery.subscribe((data:any) => {
      // add formgroup in connectionForm
      this.connListlength = data.length;
      this.dontRepeatConQuery = true;
      this.connecTionQuery(data);
      mainQuerySubscribed.unsubscribe();
      this.isLoaded = false;
    }, 
    (err) => { this.isLoaded = false },
    () => { this.isLoaded = false } );
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
      this.networkService
      .unfollowUser(user.user_profile.id)
      .pipe(takeUntil(this.$destroy))
      .subscribe(({data}) => {
        let findedIndex = this.connectionsList.findIndex( item => item.user_profile.id == user.user_profile.id );
        this.connectionsList.splice(findedIndex,1);
        this.connListlength = this.connectionsList.length;
      });
    });
  }
  show(){
       this.selectTextArea = true;
  }
  hide(){
      this.selectTextArea = false;

  }

  disconnect(id,index){
   this.networkService.Unfriend(id)
   .pipe(takeUntil(this.$destroy))
   .subscribe(responce => {
      this.connectionsList[index].user_profile.friend = false;
    });
  }

  connect(id,index){
  
     this.networkService.sendFriendRequest(id)
      .pipe(takeUntil(this.$destroy))
      .subscribe(responce => {
     this.connectionsList[index].user_profile.friend_request = true
    });
  }
    saveToPDF( user:any ){
      this.selectedUser =  user ;      
      setTimeout(() => this.pdf.saveCV() , 200);
    }

    imgUrl(event){
    
      this.imgUrlObject = event ;
      
    }

    // report block starts 
    reportBlock(user,index){
      if(user){
      this.reportBlockUer = user; 
      this.modalType = 'reportBlock';
      this._modal.open();
      this._modal.title =  'What you can do';
      this.reportIndex = index;
        }
     }

    isBlockedUser(event){
      if(event){
          this.connectionsList.splice(this.reportIndex,1); 
      }
  }

//  report block ends 
    close(event){
      if(event){
          this._modal.close();
           }
     }
     
  openSmallChatBox( user: any ): void {

  let { firstname, lastname, avatar, id   } = user ;

   
   let fullName = `${firstname} ${lastname} `;
   [
    {
      id: id,
      is_company: false,
      is_admin: false
    }
  ]
  
     this.networkService
     .CreateConversationUser( 
       fullName, 
       avatar,
       [
        {
          id: id,
          is_company: false,
          is_admin: false
        }
      ]
  
       )
     .subscribe((data: any) => {
        let chatId = data.data.CreateConversation.id;
        this.appcomponent.addChatBox(chatId);
      });
  }
 ngOnDestroy(){
   this.$destroy.next();
   this.$destroy.complete();
 }

 

}

