import { Component, OnInit, Input } from '@angular/core';
import { EstateFormService } from '../../../Service/estate-form.service';

@Component({
  selector: 'app-checkbox-home',
  templateUrl: './checkbox-home.component.html',
  styleUrls: ['./checkbox-home.component.scss']
})

export class CheckboxHomeComponent implements OnInit {
  
  @Input() title: string;
  @Input() list: any;

  isInvalid: boolean = false;
  isSubmitted: boolean = false;

  constructor(
     private estateFormService: EstateFormService
  ) { }

  ngOnInit() {
     this.estateFormService
         .sumbitted.subscribe( ( isSubmitted ) =>  {
                 this.isSubmitted = isSubmitted;                 
                 this.isInvalid =  this.list.filter( item => item.checked ).length > 0 ? false : true ;
          });

  };

  handleFormValidations() {
      if( this.isSubmitted ) {
             this.isInvalid =  this.list
                                   .filter( item => item.checked ).length > 0 ? false : true ;  
      };
  }

}
