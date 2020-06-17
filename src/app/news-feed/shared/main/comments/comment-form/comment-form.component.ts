import { Component, OnInit, Input } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { IFile } from 'src/app/_shared/models/files.interface';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Input() parentId:string;

  profileAvatar:string;
  commentForm:FormGroup;

  postId:string;
  isCompany:boolean;
  files:IFile[] = [];
  filesForUpload:Blob[] = [];

  constructor(
    private globalService:GlobalUserProService,
    private newsFeedService:NewsFeedService, 
    private fb:FormBuilder
  ) {
    this.commentForm = fb.group({
      text:['' , Validators.required]
    });
  }

  ngOnInit() {
    this.profileAvatar = this.globalService.getProfileAvatar();
    this.isCompany = this.globalService.isCompanyActive();
    this.postId = this.newsFeedService.postId;
  }


  submit(){
    if(this.commentForm.valid){
      let text = this.commentForm.value['text'];

       this.newsFeedService
           .addComment(this.postId , text , this.parentId)
           .subscribe(
             (data) => {
                this.uploadFiles(data['id']);

                this.files = [];
                this.commentForm.reset();
             }
           )
    }
  }

  loadFile(e){
    let file = e.target.files[0],
        reader = new FileReader();
        reader.readAsDataURL(file);

    if(this.files.length <= 10){
      reader.onload = (_) => {
        this.filesForUpload.push(file);
        this.files.push({
          ...file,
          mime_type:file['type'],
          base64:reader.result,
        });
     }
    }
  }

  uploadFiles(commentId:string){
    let text = this.commentForm.value['text'];

    /// If no has file 
    if(this.files.length <= 0) {
      return this.newsFeedService
                  .comment.next({
                    id:commentId,
                    created_at:new Date().toISOString(),
                    company_profile:this.isCompany ? this.globalService.getCompanyProfile() : null,
                    user_profile:!this.isCompany ? this.globalService.getUserProfile() : null,
                    isReply:!!this.parentId,
                    isNew:true,
                    text,
                    likes_amount: {
                      like:0
                    }
                  });
    };

    let form = new FormData();
    this.filesForUpload.map(file => {
      form.append('file' , file);
    });
    
    this.newsFeedService
        .uploadCommentFile(this.postId , commentId , form)
        .subscribe(
          ({info} ) => {
            if(info.length === 0) return;

            let files:IFile[] = [];

            info.map((file , idx) => {
              files.push({
                id:file.id,
                address:file.url,
                mime_type:this.filesForUpload[idx].type,
              })
            });

            this.filesForUpload = [];
            return this.newsFeedService
                  .comment.next({
                    id:commentId,
                    created_at:new Date().toISOString(),
                    company_profile:this.isCompany ? this.globalService.getCompanyProfile() : null,
                    user_profile:!this.isCompany ? this.globalService.getUserProfile() : null,
                    isNew:true,
                    isReply:!!this.parentId,
                    files,
                    text
                  });


          }
        )
        
  }



  removeImg(idx:number){
    this.files.splice(idx, 1);
  }

}
