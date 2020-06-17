import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { IFile } from '../../models/files.interface';
import { AppModalComponent } from '../app-modal/app-modal.component';


@Component({
  selector: 'app-files-viewer',
  templateUrl: './files-viewer.component.html',
  styleUrls: ['./files-viewer.component.scss']
})   
export class FilesViewerComponent implements OnInit {


  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;
  
  @Input() files:IFile[] = [];


  isOpen:boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

  trackByFn =  (index) => index;

  open(){
    this.modal.open();
    this.modal.title = 'View files';
    this.isOpen = true;
  }

}
