import { Component, OnInit, Input, ViewChild, Output, OnDestroy } from '@angular/core';
import {  NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { RecommendationService } from '../../../_shared/services/recommendation.service';
import {AppModalComponent} from '../../../_shared/components/app-modal/app-modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit , OnDestroy  {

  private _data;      
  reccomReview: any;        
  MultiplyTab: object;
  multy:boolean = false;
  $destroy: Subject<any> = new Subject<any>();


  @Input() 
      set data(value){
        this._data = value; 
          this.tabItemsCount = this.recieved.length;
          this.isCurrentUser = value['me'];  
            let recieved = value['recieved_recommendation'],   
            hidden = value['hidden_recommendation'],    
            given = value['given_recommendations'],
            request = value['received_recommendation_requests'],           
            requested = value['requested_recommendation_requests'];   
            
            
        /** Get Recommendations */
            /// Work with recived ///
            if (recieved) {      
              this.recieved = [];
 
              
              recieved.map(rec => this.recieved.push(this.setItems(rec,'recived')));  
            } 
          
            /// Work with given /// 
            if (given) {
              this.given = [];
              given.map(giv => this.given.push(this.setItems(giv,'given')));

            } 
            /// Work with request ///
            if (request) {
               this.requests = [];     
               request.map(requ => this.requests.push(this.setItems(requ,'request')));                    
        
            } 
            /// Work with requsted ///
            if (requested) {
              this.requested = [];
              requested.map(req => this.requested.push(this.setItems(req ,'requested')));  
            }
            // Work with hidden   //
            if(hidden){
                this.hidden = [];
                  hidden.map( hid => this.hidden.push(this.setItems(hid,'hidden')));      
            }
      };

      get data(){
        return this._data;
      }

        
    @Input() isClicked: boolean = false;
    @Input() showMoreData: boolean = false;
    @Output() showUserMoreLess: boolean;
     

  showMoreRec = true;
  
  @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent;
   
  requests: Array<any> = [];
  modalType: string = null;
  isCurrentUser: boolean = false;
  hidden:Array<any> = [] ;
  startPage:number = 2;
  selectedUserToWrite: any;
  seleccted:boolean;
  given: Array<any> = [];
  recieved: Array<any> = [];
  requested: Array<any> = [];
  tabItemsCount:number = 0;
  reccomLength:number;  
 

  private _recived = {
    id: null,
    fullName: null,
    skills: null,
    avatar: null,
    text: null,
    company: null,
    position: null, 
    is_hidden: null,
    url: null,
    created_at: null,
    title:null,
  }


  private _request = {
    id: null,
    fullName: null,
    position: null,
    company: null,
    avatar: null,
    created_at: null,
    text:null ,
    req_id:null,
    url: null,
    title:null,
  }


  constructor(
    private recomService: RecommendationService,
    private translate: TranslateService
  ) {

   }
   
  ngOnInit() {
    
   
    // this.reccomLength = this._data['recived'].length;
    this.reccomLength = this._data['recieved_recommendation'].length
        
  }

  /**
   * 
   * @param items 
   * @param type 
   */


  setItems(items: any, type: string) {

    let result = {};
 
   
    if (type === 'recived' || type === 'given' || type === 'hidden') {
      let data = items['receiver'] || items['recommendator']; 

      this._recived = {   
                
        id: items.id,      
        fullName: `${data.firstname} ${data.lastname}`,      
        avatar: data.avatar === '' || null ? 'assets/img/124.svg' : `/file/${data.avatar}`,
        company:  data.experiences.length  > 0?data.experiences[data.experiences.length - 1].title:null,
        position: data.experiences.length   > 0?data.experiences[data.experiences.length -1].company:null,       
        created_at: items.created_at,     
        skills: null,
        is_hidden: items.is_hidden,        
        text: items['text'] ,
        title: items['title'],
        url:  `/user/profile/${data.url}`

      }      

      if (type !== 'given') {
       const name = this.data['user']['firstname'];

       this._recived['title'] = this._recived['title'].replace(name , data.firstname)
        
      }

      result = this._recived;    

    }      
    else if (type === 'request' ||  type === 'requested') { 
      let data = items['requested'] || items['requestor'];      

      this._request = {    

        id: data.id,           
        fullName: `${data.firstname} ${data.lastname}`,          
        avatar: data.avatar === ''  || null ? 'assets/img/124.svg' : `/file/${data.avatar}`,   
        company: data.experiences.length  > 0?data.experiences[data.experiences.length -1].title:null,   
        position: data.experiences.length > 0?data.experiences[data.experiences.length -1].company:null,  
        created_at: items.created_at, 
        text:  items['text'],
        title: items['title'],
        req_id:items.id,
        url:   `/user/profile/${data.url}`

      };
      result = this._request; 
    }     
    return result;
  }
  ignoreRequest(id: string, index:number) {                                                                                                                                                                                                           
    this.recomService.ignoreRequest(id)
     .pipe(takeUntil(this.$destroy))
      .subscribe(({ data }) => {
 
      });                                                                                                                                         
    this.requests.splice(index, 1);                                                                    
             
  }   


  setVisibility(type:string,id:string, is_visible:boolean,index){

      this.recomService
      .setVisibility(id , is_visible)
       .pipe(takeUntil(this.$destroy))
       .subscribe(data => console.log(data));
       ;
      if(type ==='accept'){
        this.recieved[index].is_hidden = false;

      }
      else if(type === 'dismiss') {
        this.hidden.unshift(this.recieved[index]);    
        this.recieved.splice(index,1)     

       }
       else if(type === 'unhide'){
        let recived = this.hidden[index];
        this.recieved.unshift(recived);
        this.hidden.splice(index,1)   
        this.MultiplyTab = {
          isShowMore:this.multy = !this.multy,
          dataLength:this.hidden.length,
          startPage:this.startPage
      }

       }
       else if(type === 'hide' ){
        let hidden = this.recieved[index];
         this.hidden.unshift(hidden);
        this.recieved.splice(index,1)   
        this.MultiplyTab = {
          isShowMore:this.multy = !this.multy,
          dataLength:this.recieved.length,
          startPage:this.startPage
      }

     }
 }


  selectTab(tab:NgbTabChangeEvent){

    let selectedTab = tab.nextId;
    switch(selectedTab){
      case 'recived':{  
        this.reccomLength = this.recieved.length
        this.tabItemsCount = this.recieved.length;
        this.MultiplyTab = {
            isShowMore:this.multy = !this.multy,
            dataLength:this.recieved.length,
            startPage:this.startPage
        }
        break;
      }
      case'given':{

        this.reccomLength = this.given.length
        this.tabItemsCount = this.given.length;

        this.MultiplyTab = {
          isShowMore:this.multy = !this.multy,
          dataLength:this.given.length,
          startPage:this.startPage
      }

        break;
      }
      case'request':{  
        this.reccomLength = this.requests.length
        this.tabItemsCount = this.requests.length;
        this.MultiplyTab = {
          isShowMore:this.multy = !this.multy,
          dataLength:this.requests.length,
          startPage:this.startPage
      }
        break;
      }
      case'requested':{
        this.reccomLength = this.requested.length
        this.tabItemsCount = this.requested.length;
        this.MultiplyTab = {
          isShowMore:this.multy = !this.multy,
          dataLength:this.requested.length,
          startPage:this.startPage
      }

        break;
      }
      case'hidden':{
        this.reccomLength = this.hidden.length;
        this.tabItemsCount = this.hidden.length;
    
        this.MultiplyTab = {
          isShowMore:this.multy = !this.multy,
          dataLength:this.hidden.length,
          startPage:this.startPage
      }
        break;
      }
      default: break;
    }
  }
  open(modalType , content?:any , idx?:number){

     if(modalType === 'ask'){
          this._modal.$title =  this.translate.get('188');
          this.modalType = 'ask';
          this._modal.open();
     }

     else if(modalType === 'recommend'){
 
       
          this._modal.$title =  this.translate.get('1169')
          this.modalType = 'recommend';
          this._modal.open();      
      }

    else if(modalType === 'writeRecommendation') {    

        this.selectedUserToWrite = this._data['received_recommendation_requests'][idx]["requestor"];
        this._modal.$title =  this.translate.get('1169')
        this.modalType = 'writeRecommendation';                   
        this._modal.open();    

    }

 }   

  getResult(result: object) {      
    this.seleccted = false;

    let input = {   
      user_id:result['user_id'],   
      text:result['text'],
      title:result['title'],
      relation:result['relation']   
    }

    if(this.modalType === 'ask'){

    this.recomService.askRecomendation(input)
      .pipe(takeUntil(this.$destroy))
          .subscribe(({ data }) => {
            }); 

      this._modal.close();

  }

    else if(this.modalType === 'recommend'){

      this.recomService.writeRecommendation(input)
      .pipe(takeUntil(this.$destroy))
        .subscribe(({ data }) => {
        });

      this._modal.close();

  }
  
   else if (this.modalType === 'writeRecommendation') {    

      this.recomService.writeRecommendation(input)
       .pipe(takeUntil(this.$destroy))
        .subscribe(({ data }) => {
          console.log(data);
        });        

   this._modal.close(); 

    }  
     
  }     

 ngOnDestroy(){
    this.$destroy.next();
    this.$destroy.complete();


 }
 openEmptyModal() {
   this.open('ask');
 }
}     
