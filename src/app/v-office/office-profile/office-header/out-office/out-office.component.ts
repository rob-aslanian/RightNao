import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Years, MONTHS, Days } from '../../../../_shared/models/date.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-out-office',
  templateUrl: './out-office.component.html',
  styleUrls: ['./out-office.component.scss']
})

export class OutOfficeComponent implements OnInit {

  @Output() result: EventEmitter<any> = new EventEmitter<any>();
  Year:     number = new Date().getFullYear();
  MONTHS:   any[] = MONTHS;
  Days:     number[] = Days
  dateForm: FormGroup;
  
  constructor(
    private fb: FormBuilder
  ) {
      this.dateForm = this.fb.group({
         year:[''],
         month: [''],
         day: ['']
      })
   }

  ngOnInit() { }
  
  activate() {
     const { year,
             month, 
             day } = this.dateForm.controls;
             
     this.result.emit({
         day: day.value,
         month: month.value,
         year: year.value
     })
  }
}
