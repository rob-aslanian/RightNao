import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PetService } from 'src/app/pets/pet.service';

@Component({
  selector: 'app-discounted-modal',
  templateUrl: './discounted-modal.component.html',
  styleUrls: ['./discounted-modal.component.scss']
})
export class DiscountedModalComponent implements OnInit {
  @Input() pet;
  @Output() onClose:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private petService:PetService
  ) { }

  ngOnInit() {
    console.log(this.pet);
  }
  save(){
    this.onClose.emit(true);
  }

}
