import { Component, OnInit } from '@angular/core';
import { PLANT_TYPE } from 'src/app/pets/models/data/animals';
import { FormControl } from '@angular/forms';
import { AddPetService } from 'src/app/pets/add-pet.service';

@Component({
  selector: 'app-plant-type',
  templateUrl: './plant-type.component.html',
  styleUrls: ['./plant-type.component.scss']
})
export class PlantTypeComponent implements OnInit {

  plantType: any[] = PLANT_TYPE;

  plantCtrl: FormControl;
  isSubmitted: boolean = false;

  constructor(
    private petService: AddPetService
  ) {
    this.plantCtrl = petService.petCtrl;
   }

  ngOnInit() {
     this.petService
         .isSubmitted.subscribe(( isSubmitted ) => this.isSubmitted = isSubmitted)
  }

}
