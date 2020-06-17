import { Component, OnInit } from '@angular/core';
import { BREEDS } from 'src/app/pets/models/data/animals';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-breed-gender',
  templateUrl: './breed-gender.component.html',
  styleUrls: ['./breed-gender.component.scss']
})
export class BreedGenderComponent implements OnInit {

  
   type: string = 'AnimalCategory_Dogs';
   breeds = BREEDS[this.type];
   breedCtrl: FormControl;
   genderCtrl: FormControl;
   isSubmitted: boolean = false;

  

  constructor(
    private petService: AddPetService
  ) {
    this.breedCtrl = petService.breedCtrl;
    this.genderCtrl = petService.genderCtrl; 
   } 

  ngOnInit() {
    this.petService
        .aniCtrl
        .valueChanges.subscribe( data => { this.breeds = BREEDS[data];  console.log(this.breedCtrl.value) } );

    this.petService
        .isSubmitted
        .subscribe( isSubmitted => this.isSubmitted = isSubmitted );

  }

}
