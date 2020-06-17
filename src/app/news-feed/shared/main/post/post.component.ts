import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ShareComponent } from '../share/share.component';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { ActivatedRoute } from '@angular/router';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss' , '../../scss/shared.scss']
})
export class PostComponent implements OnInit {


  @ViewChild(ShareComponent, { static: false }) share:ShareComponent;
  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  @Input() post;
  @Input() isNew:boolean = false;
  @Input() type:string;

  @Output() deletePost:EventEmitter<string> = new EventEmitter<string>();
  @Output() removeProfilePosts:EventEmitter<{profileId:string , isCompany:boolean}> = new EventEmitter<{profileId:string , isCompany:boolean}>();

  showComment:boolean = false;
  postOwnerId:string;
  isOwnerCompany:boolean;
  isOpenLikeModal:boolean = false;
  likesCount:number = 0;
  isLanding :boolean; 
  modalType: string; 

  constructor(
    private newsFeedService:NewsFeedService,
    private globalService:GlobalUserProService,
    private router:ActivatedRoute,
    private utilService:UtilsService
  ) {
    this.postOwnerId = this.globalService.getProfileId();
    this.isOwnerCompany = this.globalService.isCompanyActive();
   }

  ngOnInit() {

    this.type === "landing" ? this.isLanding = true : this.isLanding = false; 
   
    if(this.post.shared_post_id) {
      this.newsFeedService
          .getNewsfeedPost(this.post.shared_post_id)
          .subscribe()
    }
  }
  

  ngAfterViewInit(): void {
    let fragment = this.router.snapshot.fragment;
    try {

       document.querySelector('#' + fragment)
               .scrollIntoView({behavior:'smooth'});

       this.router.snapshot.fragment = '';
    } catch(e){ }
    
  }

  dataForLikes(){
     if(this.post){
        let reactions = this.post.likes_amount,
            reactionsKey = Object.keys(reactions);
            
        reactionsKey.map(key => {
          if(reactions[key]){
            if(reactions[key] > 0){
              this.likesCount += reactions[key];
            }
          }
        })
        
        this.newsFeedService.likesAmount = this.likesCount;
        this.newsFeedService.allReactions = reactions;
        
     }
  }

  openShare = (id:string) => {
    this.share.open('view');
    this.newsFeedService.postId = id;
  }; 

  openLikes(id:string) {
    this.dataForLikes();

    this.modal.open();
    this.modal.title = 'Likes';
    this.isOpenLikeModal = true;
    this.newsFeedService.postId = id;
  }; 

// * * *  Modal's for Lanidng  * * * 
  openCommentsModal() {
      this.modal.open(); 
      this.modalType = 'forLandingComments'; 
      this.modal.size = 'lg'; 

  };
  
  closeModalForLanding(e: boolean) {
    if(e) { 
      this.modalType = ';)'; 
      this.modal.close();
    }  
  }; 

  //  * * * / * * *


  closeLikes() {
    this.isOpenLikeModal = false;
    this.likesCount = 0;
    this.modalType = ':)';  

  }; 


  unfollow(id:string , isCompany:boolean){
    let mutation =  this.isOwnerCompany && isCompany ?      
                    this.utilService
                        .unFollowCompnayForCompany(this.postOwnerId , id) : /// Compny to company 
                          isCompany && !this.isOwnerCompany ?
                    this.utilService.unFollowCompany(id) : ///  user to company                  
                      this.isOwnerCompany ? 
                      this.utilService
                          .unFollowUserToCompany(this.postOwnerId , id) : /// company to user 
                      this.utilService
                          .unFollow(id);  /// User to user 



    mutation.subscribe(
      () => {
        this.removeProfilePosts.emit({profileId:id , isCompany});
      }
    )
   

    
  }

  removePost = (postId) =>  this.deletePost.emit(postId);

  editPost(post){
    if(!post) return;

    return this.newsFeedService
               .post.next({...post , isEdit:true})
  }


}
