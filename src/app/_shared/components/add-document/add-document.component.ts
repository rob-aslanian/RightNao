import { Component, OnInit } from '@angular/core';
import { utilities } from '../../utilities/utilities';
import { IFile } from '../../models/files.interface';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  utils = utilities;
  files: IFile[] = [];

  filesIcons: object = {
    zip:{ icon:'/assets/img/140.svg' },
    mp3:{ icon:'/assets/img/141.svg' },
    ppt:{ icon:'/assets/img/142.svg' },
    xls:{ icon:'/assets/img/143.svg' },
    xlsx:{ icon:'/assets/img/143.svg' },
    doc:{ icon:'/assets/img/144.svg' },
    pdf:{ icon:'/assets/img/145.svg' },
    _other:{ icon:'/assets/img/268.svg' },
  }


  constructor() { }

  ngOnInit() {
  }

  get documents() : IFile[]{
    return this.files;
  }
  

  uploadFiles(e){
    let files:FileList = e.target.files;

    if(files.length > 0){

      for(let i = 0; i < files.length; i++){
         let file = files[i];

         let fileExt = this.utils.filesType(file.name);

         if(fileExt !== null){
            this.setFile(file , fileExt);
         }

           
      }
    }
    
  }

  setFile(file: File , ext:string){
 

    let formData = new FormData();
        formData.append('file' , file);

        
    this.files.push({
      name:file.name,
      icon:this.filesIcons[ext] ? this.filesIcons[ext].icon : 
                                  this.filesIcons['_other'].icon,
      file:formData,

    });

 
  }

  trackByFn =  (index) => index;
 

  removeFile(index:number){
    this.files.splice(index , 1);
  }

}
