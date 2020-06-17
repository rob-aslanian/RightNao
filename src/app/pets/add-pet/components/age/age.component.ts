import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.scss']
})
export class AgeComponent implements OnInit {

  ageCtrl: FormControl; 
  
  day: FormControl;

  isSubmitted: boolean;

  constructor(
    private petService: AddPetService
  ) { 
      this.ageCtrl = petService.ageCtrl;
      this.day = petService.day;
  }

  ngOnInit() {
      this.petService
          .isSubmitted
          .subscribe( isSumbitted => this.isSubmitted = isSumbitted );
  }

}
