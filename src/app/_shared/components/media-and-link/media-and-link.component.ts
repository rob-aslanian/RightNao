import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IFile } from '../../models/files.interface';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { IFileResult } from '../../models/fileUpload.interface';
import { PasswordValidation } from '../../register.validator';
import { IFileRemove } from '../../models/fileRemove.interface';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-media-and-link',
  templateUrl: './media-and-link.component.html',
  styleUrls: ['./media-and-link.component.scss']
})
export class MediaAndLinkComponent implements OnInit {

  @Output() result: EventEmitter<IFileResult> = new EventEmitter<IFileResult>();
  @Input() existFiles: any;
  @Input() type:string;
   
  showURlField:boolean = false;
  showErr = false;

  notAllowedType:boolean = false;
  fileSizeValid: boolean = true;
  maxFilesError:boolean = false;

  maxLinks:number = 2;
  maxFiles: number = 2;
  files: IFile[] = [];
  links:object[] = [];
  newFiles:IFile[] = [];
  

  mediaForm:FormGroup;

  allowedExt: string[] = [
    'jpg', 'jpeg', 'png',
    'bmp', 'gif', 'pdf'
  ];

  filesIcons: object = {
    pdf:{
      icon:'/assets/img/145.svg'
    }
  }

  constructor(
    private f:FormBuilder,
    private fileUploadService: FileUploadService
  ) {
      this.mediaForm = f.group({
        link:['' ,  [PasswordValidation.detectURL(), Validators.required ]],
        links: this.f.array([]),      
      } )
   }

   get formLinks() : FormArray{
     return this.mediaForm.get('links') as FormArray;
   }

   get data(){
     return {
       files:this.files,
       links:this.links
     } as IFileResult
   }

  ngOnInit() {

    this.parseData();

    this.formLinks.valueChanges.subscribe((links) => {

       if(links && links.length > 0){
         let links$ = [];     
          links.map((link , idx) => {
            let id = this.links[idx]['id'];
             if(link['link'] != '' ) { 
                links$.push({
                  id:id || null,
                  url:link['link']
                });

                this.result.emit({
                  links:links$,
                  // files:this.files
                })
             }
          });

       }
      
    });
  }

    saveLink(){
      let form = this.mediaForm,
           url = form.value['link'];

      this.showErr = true;
      
      if(form.valid && url && (url !== '' || url !== null)){
 
        this.links.push({ url });

        let link = this.formLinks;

        link.push(this.f.group({
          link:[url ,  { updateOn:'blur' } , [PasswordValidation.detectURL()]]
        }));

        // this.showURlField = false;

        this.mediaForm.get('link').reset();
        
      }
    }

  parseData(){
    
    if(this.existFiles){
      let extFiles = this.existFiles.file,
          extLinks = this.existFiles.link;
 
      /// Parse Files ///
      if(extFiles){
        if(extFiles.length > 0){
          this.maxFiles = extFiles.length;
          extFiles.map(extFile => {

            let ext = extFile['ext'] ? extFile['ext'] :
                     this.filesType(extFile['mime_type']);

            this.files.push({
              id:extFile['id'],
              ext,
              name:extFile['name'],
              isImage:this.isImage(ext),
              address:extFile['address'],
              icon:this.filesIcons[ext] ? this.filesIcons[ext].icon : null,
              file:extFile.file
            })
            
          });     
        }
      }

      /// Parse Links ///
      if(extLinks){
        if(extLinks.length > 0){
          extLinks.map((link , idx) => {
            let url = link.url ? link.url : link.address;
                
            this.formLinks.push(this.f.group({
              link:[url , [PasswordValidation.detectURL()]]
            }));

            this.links.push({
              id:link.id,
              url:url
            });
          })
        }
      }
    }
    
  }

  // *** Files & Links **** /// 
  emitData(files:IFile[]){
    this.result.emit({
      links:this.links,
      files: files || this.files 
    });

  }

  /**
   * Is File Image
   * @param ext 
   */
  isImage(ext:string) : boolean {
    if( ext === 'gif' || 
        ext === 'png' ||
        ext === 'jpg' || 
        ext === 'bmp' ||
        ext === 'jpeg')
    {
      return true;
    }
    else false;
  }

  /**
   * Converts bytes to MB
   * @param size 
   */
  bytesToMB(size:number) : number{
    return +(size / 1024 / 1024).toFixed(2);
  }


  /**
   * Valid File size
   * @param size 
   */
  validateFileSize(size:number | string) : boolean{
     if(size > 5){
       return this.fileSizeValid = false;
     }

     return this.fileSizeValid = true;
  }

  /**
   * Return file extenstion 
   * @param name 
   */
  filesType(name:string) : string{
    if(name === null) return;
    
    let fileType = name.includes('.') ? 
                      name.split('.') :
                      name.split('/');

    return fileType[fileType.length - 1].toLowerCase();
  }

  detectFileByExt(file: File , ext:string){
 
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (_e) => {

        this.files.push({
          name:file.name,
          icon:this.filesIcons[ext] ? this.filesIcons[ext].icon : null,
          file:reader.result,
          ext,
          isImage:this.isImage(ext)
        });

        this.newFiles.push({
          name:file.name,
          icon:this.filesIcons[ext] ? this.filesIcons[ext].icon : null,
          file:reader.result,
          ext,
          isImage:this.isImage(ext)
        })
 
        this.maxFiles = this.files.length;

        this.emitData(this.newFiles);

      }

      
  }


  removeLink(index: number){
      let link = this.links[index],
          postId = this.existFiles ? this.existFiles.id : null ,
          links$ = [];

      this.mediaForm.controls['link'].enable();
                
      if(link && link['id']){

        if(link['id']){
          links$.push(link['id']);
          this.fileUploadService
              .deleteLinks(postId , links$ , this.type)
              .subscribe((data) => {
                this.formLinks.removeAt(index);
                this.links.splice(index , 1);
              },
              (err) => {} );
        }
        
      }

      this.formLinks.removeAt(index);
      this.links.splice(index , 1);
  }

  removeItem(index:number){
    if(this.existFiles){

      let fileRemove: IFileRemove ={
        id:this.existFiles.id,
        files_id: this.existFiles.files_id ? [this.existFiles.files_id[index]] : [this.files[index].id]
      };
      
      if(fileRemove && !fileRemove.files_id.includes(null)){
        this.fileUploadService.deleteFiles(fileRemove , this.type);
      }

      this.existFiles.file.splice(index, 1);  
      this.emitData(this.existFiles.file);
    }
      
      this.newFiles.splice(index , 1);
      this.files.splice(index , 1);

     return this.emitData(this.files);

       
    
  }


  uploadFiles(e) {
    let files: FileList = e.target.files;
     if(files.length > 0){
       /// If files count greater than max files /// 
       if(files.length > this.maxFiles && this.files.length > this.maxFiles){
            // this.files = this.existFiles.f
            this.maxFilesError = true;
            return;
       }else this.maxFilesError = false;

       for(let i = 0; i < files.length; i++){
          let file = files[i],
              fileSize = this.validateFileSize(this.bytesToMB(file.size));

          if(!fileSize) break;

          let fileExt = this.filesType(file.name);

          if(fileExt !== null){
            /// Check if file type allowed ///
             if(this.allowedExt.includes(fileExt)){
                this.notAllowedType = false;
                this.detectFileByExt(file , fileExt);   

             }else{
                this.files = [];
                this.notAllowedType = true;
            }
          }      
       }
     }    
  }
  
  trackByFn =  (index) => index;

  saveAndAddAnother(){ 
    this.files  = []; 
    this.links  = [];
    this.newFiles = [];    
 }
}
