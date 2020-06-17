import { Component, OnInit } from '@angular/core';
import { GARDEN_SUPPLIES_TOOLS } from 'src/app/pets/models/model';
import { FormControl } from '@angular/forms';
import { AddPetService } from 'src/app/pets/add-pet.service';

@Component({
  selector: 'app-garden-supplies',
  templateUrl: './garden-supplies.component.html',
  styleUrls: ['./garden-supplies.component.scss']
})
export class GardenSuppliesComponent implements OnInit {
 
  GARDEN_SUPPLIES_TOOLS = GARDEN_SUPPLIES_TOOLS;
  gardenCtrl: FormControl;
  isSubmitted: boolean = false;
  
  constructor(
     private addPetService: AddPetService
  ) { 
     this.gardenCtrl = addPetService.gardenCtrl;
  }

  ngOnInit() {
    this.addPetService
        .isSubmitted.subscribe((isSubmitted)=>this.isSubmitted = isSubmitted);
        
  }

}
