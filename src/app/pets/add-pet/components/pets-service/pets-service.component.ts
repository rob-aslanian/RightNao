import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormControl } from '@angular/forms';
import { PET_SERVICE } from 'src/app/pets/models/data/animals';

@Component({
  selector: 'app-pets-service',
  templateUrl: './pets-service.component.html',
  styleUrls: ['./pets-service.component.scss']
})
export class PetsServiceComponent implements OnInit {

  petSerCtrl: FormControl ;
  PET_SERVICE = PET_SERVICE;
  isSubmitted: boolean = false;

  constructor(
    private addPetsService: AddPetService
  ) {
     this.petSerCtrl = addPetsService.pet_serviceCtrl;
   }

  ngOnInit() {
    this.addPetsService
        .isSubmitted.subscribe((isSubmitted) => this.isSubmitted =  isSubmitted);
  }

}
