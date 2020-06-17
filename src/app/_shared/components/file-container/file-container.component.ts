import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-file-container',
  templateUrl: './file-container.component.html',
  styleUrls: ['./file-container.component.scss']
})
export class FileContainerComponent implements OnInit {

  
   _file:any;

  @Input() controls:boolean = true;
  @Input() hasClass:boolean = false;
  
  @Input() 
          set file(value){
            if(value){
               this._file = {
                 ...value,
                 type:value['mime_type'].split('/')[0],
                 path:value['address'] ? `/file/${value['address']}` : value['base64']
               }
            }
          };

  isLanding: boolean; 


  constructor(
  ) { }

  ngOnInit() {
  
  }

}
