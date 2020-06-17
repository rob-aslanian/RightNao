import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, takeUntil, filter } from 'rxjs/operators';
import { NewsFeedPostType } from 'src/app/_shared/models/news-feed/news-feed.model';
import { PostComponent } from '../post/post.component';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit , OnDestroy {

  @ViewChild(PostComponent, { static: false }) post:PostComponent;

  $destroy:Subject<any> = new Subject<any>();

  @Input() type:NewsFeedPostType = 'any';

  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  first:number = 0;
  firstStr:string = "5";

  posts:any[] = []; 
  profileId:string;
  isLoading:boolean = true;
  postAmount:number = 0;
  isNew:boolean = false;

  constructor(
    private newsFeedService:NewsFeedService,
    private globalService:GlobalUserProService
  ) { 

  }

  ngOnInit() {

    if(this.type === 'landing'){
      this.firstStr = "3";
      console.log(this.posts);
     
      
    }
    /// New post 
    if(this.type !== 'shares'){
      this.newPost();
      // this.getNewPosts();
    }

    let id = null;

    if(this.type === 'landing' || this.type === 'posts') {
       id = this.globalService.getProfileId();  
    }else {
      this.profileId = this.newsFeedService.profile.id;
          id = this.type === 'any' ? this.profileId :
              this.newsFeedService.postId;
    }

    /// Get posts 
    this.getPosts(id);
    
  }

  getPosts(id?:string){
    let _id = (this.type !== 'any' && id === this.globalService.getProfileId()) ? undefined : id;
    
    
    
    this.after
        .pipe(
          takeUntil(this.$destroy),
          switchMap(() => {
            return this.newsFeedService
                      .getPosts(_id ,  this.firstStr , this.after.value , this.type)
                      .pipe(
                        takeUntil(this.$destroy),
                        map((post) => {
                          this.isLoading = false;

                          if(post !== null){
                            this.postAmount = post['post_amount']
                            if(this.postAmount > this.posts.length) {
                              this.isNew ?  this.posts.unshift(...post['posts']) :
                                            this.posts.push(...post['posts']); 
                            }
                          }
                          else {
                            this.postAmount = 0;
                          }

                          return post;
                      }));
          })
        )
        .subscribe()
  }

  /**
   * New post from subcription 
   */
  getNewPosts(){
    this.newsFeedService
        .newPosts
        .pipe(
          takeUntil(this.$destroy),
        )
        .subscribe(
          (posts) => {
            
              posts.map(el => {
                 let id = this.posts.findIndex(post => post.id !== el)
                console.log(id);
                
                 if (id <= -1){
                    this.firstStr = String(posts.length);
                    this.isNew = true;   
                    this.after.next("0"); 
                  }
              })
          }
        )
  }

  /**
   * New post for form 
   */
  newPost(){
    this.newsFeedService
        .post
        .pipe(
          filter(post => !post.isEdit),
          takeUntil(this.$destroy)
        )
        .subscribe(
          (post) => {
            let { id , _change } = post;
            
            
            /// Edit 
            if(_change){
              let postIdx = this.posts.findIndex(post => post.id === id);
              
              if(postIdx > -1){
                this.posts[postIdx] = post;
              }
            } else {
                this.posts.unshift(post)
            }
          },
        )


  }

  scrolled(e){
   if(this.postAmount !== this.posts.length){
    this.isNew = false;
    this.firstStr = "5";
    
    if(this.first + 5 > this.postAmount){
      this.first = this.postAmount;
      this.isLoading = true;
      this.after.next(String(this.postAmount - 1));
    }
 
    if(this.first <= this.postAmount && this.first + 5 < this.postAmount){
      let next = this.first += 6;
      this.isLoading = true;
      this.after.next(String(next));
    }  

   }
    
  }

  trackByFn = (idx) => idx; 

  removePost(postId:string){
    let postIdx = this.posts.findIndex(post => post.id === postId);

    if(postIdx < 0) return;

    this.newsFeedService
        .removePost(postId)
        .pipe(takeUntil(this.$destroy))
        .subscribe(
          () => {
            this.posts.splice(postIdx, 1);
          }
        )
    
  }

  removeOthersPosts({profileId , isCompany}){
    const ownerType = isCompany ? 'company_profile' : 'user_profile',
              posts = this.posts
                          .filter(el => el[ownerType]['id'] === profileId );

     posts.map(post => {
        let idx = this.posts.findIndex(el => el.id === post.id);
        this.posts.splice(idx, 1);
        
     });
    
  }


  ngOnDestroy(){
    this.$destroy.next();
    this.$destroy.complete();

  }
}
