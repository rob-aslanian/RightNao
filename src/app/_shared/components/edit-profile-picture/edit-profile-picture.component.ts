import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { Apollo } from 'apollo-angular';
import { graphqlUserProfile } from '../../graphql/user-profile';
import { graphqlCompanyProfile } from '../../graphql/company-profile';  
import { AddImageComponent } from '../add-image/add-image.component';
import { ImageUploadService } from '../../services/shared/image-upload.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile-picture',
  templateUrl: './edit-profile-picture.component.html',
  styleUrls: ['./edit-profile-picture.component.scss']
})
export class EditProfilePictureComponent implements OnInit {

    @ViewChild(AddImageComponent, { static: false }) image:AddImageComponent;

    @Input()  type:any;

    @Output() result: EventEmitter<any> = new EventEmitter<any>();

    avatar:string;
    cropType: string = 'square';
    imgLoaded:boolean = false;

    
    constructor(
      private userService: GlobalUserProService,
      private apollo: Apollo,
      private imageService:ImageUploadService
    ) { 
      this.cropType = !userService.isCompanyActive() && 'circle';
    }

    ngOnInit() {

      this.imageService
          .getAvatar()
          .subscribe(
            (avatar) => {
              this.avatar = avatar;
              this.imgLoaded = true;
            }
          )
    }
    
    onUpload(e) {
      e.preventDefault();

      let originImage = this.image.getFile.originImage,
          image = this.image.getFile.file;

      /// Add Image
      if(originImage || image){
        let formData = new FormData();
            formData.append('file' , originImage)
                      
  
        this.result.emit({
          closeModal:true,
          deleteImage:false,
          image
        });
  
        this.imageService
            .uploadAvatarOrigin(formData)
            .subscribe();
        
      } else{
         this.onRemoveImg();
      }

      return false;
    }

    onRemoveImg() {
      
      /// Mutation for company or user /// 
      let mutate = this.type === 'company' ?
                  {
                    mutation:graphqlCompanyProfile.RemoveCompanyAvatar,
                    variables:{
                      company_id:this.userService.getComapnyId()
                    }
                  } : { mutation: graphqlUserProfile.removeAvatar, } /// if user
      
      this.apollo
          .mutate(mutate)
          .subscribe(
            ({ data }) => {
              this.result.emit({
                file: '',
                name:'',
                deleteImage:true,
                closeModal:true,
              })
            },
          );
    }




}
