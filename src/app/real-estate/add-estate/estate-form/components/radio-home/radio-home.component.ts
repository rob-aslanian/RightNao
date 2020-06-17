import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EstateFormService } from '../../../Service/estate-form.service';

@Component({
  selector: 'app-radio-home',
  templateUrl: './radio-home.component.html',
  styleUrls: ['./radio-home.component.scss']
})
export class RadioHomeComponent implements OnInit {

  @Input()
     ctrl: FormControl;
  
  @Input()
      data: any[];

  @Input()
      title: string;

  isSubmitted: boolean = false;

  constructor(
    private estateFormService: EstateFormService
  ) { }

  ngOnInit() {
   console.log(this.ctrl);
   
    this.estateFormService
        .sumbitted
        .subscribe( isSubmitted => { if( isSubmitted ) this.isSubmitted = isSubmitted });
  }

}
