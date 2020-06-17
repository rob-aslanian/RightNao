import { Component, OnInit } from '@angular/core';
import { FOODS_ACCESSORIES } from 'src/app/pets/models/data/animals';
import { FormControl } from '@angular/forms';
import { AddPetService } from 'src/app/pets/add-pet.service';

@Component({
  selector: 'app-animal-food',
  templateUrl: './animal-food.component.html',
  styleUrls: ['./animal-food.component.scss']
})
export class AnimalFoodComponent implements OnInit {

  FOODS_ACCESSORIES: any[] = FOODS_ACCESSORIES;
  foodCtrl: FormControl;
  isSubmitted = false;

  constructor(
    private addPetService: AddPetService
  ) { 
    this.foodCtrl = addPetService.foodCtrl;
  }

  ngOnInit() {
    this.addPetService
        .isSubmitted
        .subscribe( isSubmitted => this.isSubmitted = isSubmitted );
  }

}
