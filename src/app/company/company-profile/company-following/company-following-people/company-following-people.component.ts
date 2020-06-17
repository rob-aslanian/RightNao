import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { AppComponent } from 'src/app/app.component';
import { takeUntil, map } from 'rxjs/operators';
import { Following } from '../../../../_shared/graphql/network-company/following';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';


@Component({
  selector: 'app-company-following-people',
  templateUrl: './company-following-people.component.html',
  styleUrls: ['../../../../network/network.component.scss','./company-following-people.component.scss']
})
export class CompanyFollowingPeopleComponent implements OnInit, OnDestroy {

  companyFollowingPeople :any[] = []
  companyID :string;
  myCompanyId :string; 
  myUserID :string; 
  
  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  // companyID:string;
  toggle:any;
  connectionsList:any[] = [];
  connListlength:number;
  isSelectedConn:any;
  dontRepeatConQuery:boolean = true;
  selectedItem:any;
  searchForm: FormGroup;
  savePDF:any;
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
    private router :ActivatedRoute,
    private globalUserProServ :GlobalUserProService,
    private companyService :CompanyProfileService,
    private apollo: Apollo,
    private fb:FormBuilder,
    private globalUserProfileService: GlobalUserProService,
    private utilService:UtilsService,
    private appComponent:AppComponent,
    private userprofileService: UserProfileService
  ) { }

  ngOnInit() {
    this.myCompanyId = this.globalUserProServ.getCompanyProfile().id;
    this.companyID = this.router.snapshot.params['id'];
    this.myUserID = this.globalUserProServ.getUserProfile().id; 
    this.getFollowsOfCompany();


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
  }

  
  open(type:string , user){
    this.modalType = type;
    this.modal.open();

    this.selectedUser = user;
    this.modal.title = `Report ${user.firstname}`;
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
        let findedUser = this.companyFollowingPeople.find( some => some.index === index && item );
        typeof findedUser != "undefined" ? itemId.push(findedUser) : null;
      });
    }
    
    itemId.map(user => {    
      this.apollo.mutate({
        mutation: Following.Unfollow,
        variables: {
          "companyId": this.myCompanyId,
          "userId": user.id,
        }
      }).subscribe(({data}) => {
        let findedIndex = this.companyFollowingPeople.findIndex( item => item.id == user.id );
        // this.connectionsList.splice(findedIndex,1);
        // this.connListlength = this.connectionsList.length;
      });
    });
  }


  closeModal(event){
    event.preventDefault();
    this.toggle.main.active[this.toggle.main.selected] = false;
  }

  saveToPDF(user){
      this.selectedUser = user;
      this.savePDF = true;
    }

  openSmallChatBox(user) {
    let {fName, lName, avatar, id} = user;
    let mutation = this.globalUserProServ.isCompanyActive() ?
                    this.userprofileService
                        .openSmallChatBoxForComapny({
                            avatar , 
                            name:`${fName} ${lName}` , 
                            id , 
                            companyId:this.globalUserProServ.getComapnyId()
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

  // Get Following Poeple for Company 
  getFollowsOfCompany(){
    return this.companyService
    .getFollowsOfCompany(this.companyID)
    .subscribe(data => {
      data['getFollowsOfCompany'].profiles.map((item,ind) => {
        if( this.dontRepeatConQuery ){ 
          (this.connectionsForm.controls.checkbox as FormArray).push( 
            this.fb.control('') 
          ); 
          item.index = ind;  
        } 
        this.companyFollowingPeople = item;
      })
  
      this.companyFollowingPeople = data['getFollowsOfCompany'].profiles; 
      
    })
  }

  ngOnDestroy(): void {
    this.getFollowsOfCompany().unsubscribe();
    
  }
}
