import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-credit-card-modal',
  templateUrl: './credit-card-modal.component.html',
  styleUrls: ['./credit-card-modal.component.scss']
})
export class CreditCardModalComponent implements OnInit {

  @Input() total:string;

  @Output() closeModal:EventEmitter<boolean> = new EventEmitter<boolean>(); 

  creditForm:FormGroup;

  constructor(
    private f:FormBuilder
  ) { 
    this.creditForm = this.f.group({});

    this.creditForm.disable();
  }

  ngOnInit() {
  }

}
