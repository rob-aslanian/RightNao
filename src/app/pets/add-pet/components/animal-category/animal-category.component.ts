import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormControl } from '@angular/forms';
import { ANIMALS } from 'src/app/pets/models/data/animals';

@Component({
  selector: 'app-animal-category',
  templateUrl: './animal-category.component.html',
  styleUrls: ['./animal-category.component.scss']
})
export class AnimalCategoryComponent implements OnInit {

  aniCtrl: FormControl;
  animals = ANIMALS;
  isSubmitted: boolean = false;
 
  constructor(
    private petsService: AddPetService
  ) { 
     this.aniCtrl = petsService.aniCtrl;
  }

  ngOnInit() {
     this.petsService.isSubmitted
         .subscribe( isSubmitted => this.isSubmitted = isSubmitted );
   }

  getValue() {
      return this.aniCtrl.value;
  }
}
