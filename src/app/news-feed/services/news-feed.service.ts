import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { graphqlNewsFeed } from 'src/app/_shared/graphql/news-feed/news-feed';
import { Observable, Subject, of } from 'rxjs';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { INewsFeedProfile, INewsFeedComment, INewsFeedPost, INewsFeedPostChange, INewsFeedAddPost, INewsFeedLike, INewsFeedReaction } from 'src/app/_shared/models/news-feed/news-feed.interface';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NewsFeedPostType } from 'src/app/_shared/models/news-feed/news-feed.model';


const  API_PATH = '/api/v1/uploading/',
       POST_PATH = API_PATH + 'newsfeed_post/',
       COMMENT_PATH = API_PATH + 'newsfeed_post_comment/';


const queries = {
  posts:{
    any:'getNewsFeed',
    posts:'getNewsFeed',
    landing:'getNewsFeed',
    shares:'getSharedPost',
  }
}
@Injectable()
export class NewsFeedService {

  public profileQuery:Observable<any>;
  public postsQuery:Observable<any>;
  public comment:Subject<INewsFeedComment> = new Subject<INewsFeedComment>();
  public post:Subject<INewsFeedPost> = new Subject<INewsFeedPost>();
  public newPosts:Subject<string[]> = new Subject<string[]>();
  public reactions:Subject<INewsFeedReaction> = new Subject<INewsFeedReaction>();

  public postAmount:number;
  public likesAmount:number;
  public allReactions:any;
  public postId:string;
  public profile:INewsFeedProfile;
  public sharedPost:INewsFeedPost;

  constructor(
    private apollo:Apollo,
    private globalService:GlobalUserProService,
    private http:HttpClient
  ) { }

  get companyId() : string {
    return (this.globalService.isAuthenticated() && this.globalService.isCompanyActive()) ?
           this.globalService.getComapnyId() : undefined;
  }


  /**
   * Added post 
   * @@@ subscription @@@@
   * 
   * @param id 
   */
  public AddedPost(id:string) : Observable<any> {

    return this.apollo.subscribe({
      query:graphqlNewsFeed.AddedPost,
      variables:{ id }
    })
    .pipe(map(({data}) => data['addedPost']))
  }


  /**
   * Added Like 
   * @@@ subscription @@@@
   * 
   * @param post_id 
   * @param comment_id 
   */
  public AddedLike(post_id:string , comment_id?:string) : Observable<any> {
    return this.apollo.subscribe({
      query:graphqlNewsFeed.AddedLike,
      variables:{  post_id , comment_id }
    })
    .pipe(map(({data}) => data['addedPostLike']))
  }

  /**
   * Added Comment 
   * @@@ subscription @@@@
   * 
   * @param post_id 
   */
  public AddedComment(post_id:string) : Observable<any> {
    return this.apollo.subscribe({
      query:graphqlNewsFeed.AddedComment,
      variables:{ post_id }
    })
    .pipe(map(({data}) => data['addedPostComment']))

  }

  /**
   * Add Post 
   * 
   * @param text 
   * @param files_ids 
   * @param newsfeed_user_id 
   * @param newsfeed_company_id 
   * @param shared_post_id
   */
  public AddPost(post:INewsFeedAddPost) : Observable<any>{
    
    let company_id = this.companyId;

    return this.apollo.mutate({
      mutation:graphqlNewsFeed.AddPost,
      variables:{
        ...post,
        company_id       
      }
    })
    .pipe(map(({data}) => data['AddPostInNewsfeed']))
  }


  public getPosts(id:string , first:string , after:string , type:NewsFeedPostType) : Observable<any>{
    let query = queries['posts'][type];

    if(!query) return of(null);

    

    return this[query](id , first , after);
  }
  /**
   * Get news feed 
   * 
   * @param id 
   * @param first 
   * @param after 
   */
  public getNewsFeed(id:string , first:string , after:string) : Observable<any> {
    let company_id = this.companyId;

    return this.apollo.query({
      query:graphqlNewsFeed.GetNewsFeed,
      fetchPolicy:'network-only',
      variables:{
        id,
        first,
        after,
        company_id
      }
    })
    // .valueChanges
    .pipe(map(({data}) => data['GetNewsfeed']))
  }

  /**
   * Get News feed post
   * @param id 
   */
  public getNewsfeedPost(id:string) : Observable<any> {
    return this.apollo.query({
      query:graphqlNewsFeed.GetNewsfeedPost,
      variables:{ id }
    })
    .pipe(map(({data}) => data['GetNewsfeedPost']))
  }

  /**
   * Remove post 
   * 
   * @param post_id 
   */
  public removePost(post_id:string ) : Observable<any> {

    let company_id = this.companyId;

    return this.apollo.mutate({
      mutation:graphqlNewsFeed.RemovePostInNewsfeed,
      variables:{ post_id , company_id }
    })
  }

  /**
   * Remove comment 
   * 
   * @param post_id 
   * @param comment_id 
   */
  public removeComment(post_id:string , comment_id:string) : Observable<any> {
    
    let company_id = this.companyId;

    return this.apollo.mutate({
      mutation:graphqlNewsFeed.RemoveCommentInPostInNewsfeed,
      variables:{ post_id , comment_id , company_id  }
    })
  }

  /**
   * Put reaction to post 
   * 
   * @param post_id 
   * @param like 
   * @param comment_id 
   */
  public likePost(post_id: string , like:INewsFeedLike , comment_id?: string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlNewsFeed.LikePostInNewsfeed,
      variables:{ post_id , like ,  comment_id }
    })
  }

  /**
   * Unlike post 
   * 
   * @param post_id 
   * @param id 
   * @param comment_id 
   */
  public unLike(post_id: string, id:string , comment_id?: string ): Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlNewsFeed.UnlikePostInNewsfeed,
      variables:{ post_id , id ,  comment_id}
    })
  }

  /**
   * Get Reactions list 
   * 
   * @param post_id 
   * @param emoji 
   * @param first 
   * @param after 
   * @param comment_id 
   */
  public getLikesList(post_id:string , emoji:string , 
                      first:string , after:string , comment_id?:string) : Observable<any>{
    let company_id = this.companyId;

    return this.apollo.query({
      query:graphqlNewsFeed.GetListOfLike,
      variables:{ post_id,  company_id , emoji , first , after , comment_id }
    })
    .pipe(map(({data}) => data['GetListOfLikedInNewsfeed']))
  }

  /**
   * Change post 
   * 
   * @param post 
   */
  public changePost(post:INewsFeedPostChange) : Observable<any> {

    post.company_id = this.companyId;

    return this.apollo.mutate({
      mutation:graphqlNewsFeed.ChangePostInNewsfeed,
      variables:{ post }
    })
  }

  /**
   * Get shared post 
   * 
   * @param id 
   * @param first 
   * @param after 
   */
  public getSharedPost(id:string , first:string , after:string) : Observable<any> {
    return this.apollo.watchQuery({
      query:graphqlNewsFeed.GetSharedPost,
      fetchPolicy:'network-only',
      variables:{
        id,
        first,
        after
      }
    })
    .valueChanges
    .pipe(map(({data}) => data['GetSharedPost']))
  }

  /**
   * Get Comments
   * @param post_id 
   * @param sort 
   * @param first 
   * @param after 
   */
  public getComments(post_id:string , first:string , after:string , sort:string = "time_creation") : Observable<any>{
      
    return this.apollo.watchQuery({
      fetchPolicy:'network-only',
      query:graphqlNewsFeed.GetComments,
      variables:{ post_id , sort , first, after }
    })
    .valueChanges
    .pipe(map(({data}) => data['GetCommentsOfNewsfeedPost']))
  }


  /**
   * Get reply comments 
   * 
   * @param post_id 
   * @param commentID 
   * @param first 
   * @param after 
   */
  public getReplyComment(post_id:string , commentID: string ,  first:string , after:string ) : Observable<any>{
    return this.apollo.watchQuery({
      fetchPolicy:'network-only',
      query:graphqlNewsFeed.GetReplyComments,
      variables:{ post_id , commentID , first, after }
    })
    .valueChanges
    .pipe(map(({data}) => data['GetCommentRepliesOfNewsfeedPost']))
  }

  /**
   * Add Comment 
   * 
   * @param post_id 
   * @param text 
   * @param parent_id 
   * @param files_ids 
   */
  public addComment(post_id:string, text:string , 
                    parent_id?:string , files_ids?:string[])  : Observable<any> {

    let company_id = this.companyId;

    return this.apollo.mutate({
      mutation:graphqlNewsFeed.AddComment,
      variables:{ post_id , text ,  parent_id , company_id , files_ids }
    })
    .pipe(map(({data}) => data['AddCommentInPostInNewsfeed']))
  }

  /**
   * Upload files for comments 
   * 
   * @param postId 
   * @param commentId 
   * @param form 
   */
  public uploadCommentFile(postId:string , commentId:string , form:FormData) : Observable<any>{
    let api = `${COMMENT_PATH}${postId}/${commentId}`;
    
    return this.http.post(api , form) 
  }


  /**
   * Upload files for post 
   * 
   * @param postId 
   * @param form 
   */
  public uploadPostFile(postId:string , form:FormData) : Observable<any>{
    let api = `${POST_PATH}${postId}`;
    
    return this.http.post(api , form) 
  }
}
