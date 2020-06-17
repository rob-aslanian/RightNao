import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormControl } from '@angular/forms';
import { FOODS_ACCESSORIES } from 'src/app/pets/models/data/animals';

@Component({
  selector: 'app-animal-accessories',
  templateUrl: './animal-accessories.component.html',
  styleUrls: ['./animal-accessories.component.scss']
})
export class AnimalAccessoriesComponent implements OnInit {

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
