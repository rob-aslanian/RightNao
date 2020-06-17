import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GroupsService } from 'src/app/groups/shared/services/groups.service';


@Component({
  selector: 'app-description-modal',
  templateUrl: './description-modal.component.html',
  styleUrls: ['./description-modal.component.scss']
})
export class DescriptionModalComponent implements OnInit {
   
  tagline: FormControl;
  @Input() edit: any;
  
  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  constructor(

  ) {
    this.tagline = new FormControl('');
   }

  ngOnInit() {
    this.tagline.setValue(  this.edit );
  }

  submit() {
     const value = this.tagline.value.trim();
     this.result.emit( 
        value
     );
  }
}
