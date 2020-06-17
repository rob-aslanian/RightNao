import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { IFile } from 'src/app/_shared/models/files.interface';
import { FormControl } from '@angular/forms';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { INewsFeedProfile } from 'src/app/_shared/models/news-feed/news-feed.interface';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, merge, zip } from 'rxjs';
import { FileType } from 'src/app/_shared/models/shared/shared.models';
import { WalletService } from 'src/app/wallet/shared/wallet.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss' , '../../scss/shared.scss']
})
export class CreatePostComponent implements OnInit , OnDestroy {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  $destoy:Subject<any> = new Subject<any>();

  profileId:string;
  profileAvatar:string;
  profileName:string;
  postId:string;
  isCompany:boolean;
  fileType:FileType = 'none';

  newsFeedProfile:INewsFeedProfile;

  filesForUpload:Blob[] = [];
  files:IFile[] = [];
  isOpen:boolean = false;
  isEdit:boolean = false;

  textControl:FormControl;

  constructor(
    private globalService:GlobalUserProService,
    private newsFeedService:NewsFeedService,
    private walletService:WalletService
  ) { 
    this.textControl = new FormControl(null);
  }

  ngOnInit() {
    this.profileAvatar = this.globalService.getProfileAvatar();
    this.profileName = this.globalService.getProfileName();
    this.isCompany = this.globalService.isCompanyActive();
    this.newsFeedProfile = this.newsFeedService.profile;

    /// Edit post detect
    this.editPost();

  }

  editPost(){
    this.newsFeedService
        .post
        .pipe(
          takeUntil(this.$destoy),
          filter(post => post.isEdit),
        )
        .subscribe(
          (post) => {
            this.patchData(post)
            this.open();
          }
        )
  }

  patchData(post){
    let { text , files } = post;
    
    this.postId = post.id;
    this.files = files;
    this.filesForUpload = files;

    this.isEdit = true;
    this.textControl.setValue(text);
  }

  loadFile(e , fileType?:FileType){
    let files:any[] = e.target.files;    
    
    this.open();
    this.fileType = fileType;

    Array.from(files).map(async file => {

        this.filesForUpload.push(file);
        this.files.push({
          name:file['name'],
          mime_type:file['type'],
          base64:URL.createObjectURL(file),
        });
      
    })

  }

  removeFile(idx) {
    this.files.splice(idx , 1);
    this.filesForUpload.splice(idx , 1);

    if(this.files.length === 0) { this.fileType = 'none'; }
  }

  open(){
    !this.isOpen ? this.modal.open() : null;
    this.modal.title = 'Create post';
    this.isOpen = true;
  }

  close(){
    this.isOpen = false;
    this.isEdit = false;
    this.textControl.reset();
    this.files = [];
    this.filesForUpload = [];
    this.fileType = 'none';
  }

  emitData(id:string , text:string ,  files?:IFile[]){
    this.newsFeedService
        .post.next({
          id,
          files,
          text,
          created_at:!this.isEdit ? new Date().toISOString() : undefined,
          changed_at:this.isEdit ? new Date().toISOString() : undefined,
          company_profile:this.isCompany ? this.globalService.getCompanyProfile() : null,
          user_profile:!this.isCompany ? this.globalService.getUserProfile() : null,
          isNew:!this.isEdit,
          _change:this.isEdit
        });

    this.modal.close();
  }


  uploadFile(id:string , text:string){
     if(!this.files || this.files.length <= 0) return this.emitData(id , text);

     let form = new FormData();
     this.filesForUpload.map(file => {
       form.append('file' , file);
     });
     
     this.newsFeedService
         .uploadPostFile(id , form)
         .pipe(takeUntil(this.$destoy))
         .subscribe(
           ({info} ) => {
             if(info.length === 0) return;
 
             let files:IFile[] = [];
 
             info.map((file , idx) => {
               files.push({
                 id:file.id,
                 address:file.url,
                 name:this.filesForUpload[idx]['name'],
                 mime_type:this.filesForUpload[idx].type,
               })
             });
 
             this.filesForUpload = [];
             return this.emitData(id ,text , files);
 
           }
         )
  }

  submit(){
    let text = !!this.textControl.value ?  this.textControl.value : ' ',
        profile = this.newsFeedProfile,
        userId = !profile.isCompany ? profile.id : undefined,
        companyId = profile.isCompany ? profile.id : undefined,
        mutation = this.isEdit ? this.newsFeedService
                                     .changePost({
                                       post_id:this.postId,
                                       is_pinned:false,
                                       text
                                     }) :  /// Edit post
                                     zip(
                                      this.newsFeedService
                                      .AddPost({
                                        text,
                                        newsfeed_user_id:userId,
                                        newsfeed_company_id:companyId
                                      }),
                                      /// Add post
                                      this.walletService
                                      .earnCoinsForWallet('create_post', {silver_coins: 1})
                                     );
    
    if(this.filesForUpload.length > 0 || text.trim() !== ""){
                            
      mutation.subscribe(
        (data) => {
          
          let id = this.postId || data[0]['id'];

          this.uploadFile(id , text);

          if(data.length>0) { this.walletService.changindLocalCoins(1); }
           

        })

    }
  }
  
    ngOnDestroy(): void {
    this.modal.close();

    this.$destoy.next();
    this.$destoy.complete();

    
  }


}

