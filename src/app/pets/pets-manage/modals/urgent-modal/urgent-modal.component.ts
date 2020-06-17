import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PetService } from 'src/app/pets/pet.service';

@Component({
  selector: 'app-urgent-modal',
  templateUrl: './urgent-modal.component.html',
  styleUrls: ['./urgent-modal.component.scss']
})
export class UrgentModalComponent implements OnInit {
  @Input() pet;
  @Output() onClose:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private petService:PetService
  ) { }

  ngOnInit() {
    
  }


  makeUrgent(){
    this.petService.MakePetsPlantsUrgent(this.pet.id)
                    .subscribe( data => this.onClose.emit(true) )    
  }

}
