import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EstateFormService } from '../../Service/estate-form.service';

@Component({
  selector: 'app-change-currency',
  templateUrl: './change-currency.component.html',
  styleUrls: ['./change-currency.component.scss']
})
export class ChangeCurrencyComponent implements OnInit {
  
  @Output()  
    result: EventEmitter<any> = new EventEmitter<any>();
  
  @Input()
    name: string

  @Input() 
    ctrl: FormControl;

  isSubmitted: boolean = false;

  constructor(
      private estateFormService: EstateFormService
  ) { }
   
  ngOnInit() {
        this.estateFormService
            .sumbitted
            .subscribe(( isSubmitted:  boolean ) => this.isSubmitted = isSubmitted);
  
  }


  emit({ target }) {
     this.result
         .emit({
              _case: this.name,
              value: target.value
         });
  }

}
