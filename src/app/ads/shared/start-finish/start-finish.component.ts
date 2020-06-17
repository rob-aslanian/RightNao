import { Component, OnInit, forwardRef, OnChanges } from '@angular/core';
import { Years, MONTHS, Days } from 'src/app/_shared/models/date.model';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-start-finish',
  templateUrl: './start-finish.component.html',
  styleUrls: ['./start-finish.component.scss'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting:forwardRef(() => StartFinishComponent),
    multi:true
  }]
})
export class StartFinishComponent implements  ControlValueAccessor  {

  Months = MONTHS;
  Years = Years;
  Days = Days;

  dateForm:FormGroup

  
  constructor(
    private f:FormBuilder
  ) { 
    this.dateForm = f.group({
      day:[''],
      month:[''],
      year:['']
    })
  }

  get date() {
    return this.dateForm.controls;
  }

  formChanges = (date:string) => {};


  change(e){
    let { day , month , year } = this.dateForm.value;
    this.formChanges(`${day}-${month}-${year}`)
  }

  writeValue(date: string): void {
    if(date){
      let _date = date.split('-'),
          day   = _date[0] ? _date[0] : '',
          month = _date[1] ? _date[1] : '',
          year  = _date[2] ? _date[2] : '';

      this.dateForm
          .patchValue({
            day,
            month,
            year
          })
    }
    
  }

  registerOnChange(fn: any): void {
    this.formChanges = fn;
  }
  registerOnTouched(fn: any): void {
    // this.formChanges = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log(isDisabled);
  }

 

}
