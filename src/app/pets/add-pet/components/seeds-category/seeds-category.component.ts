import { Component, OnInit } from '@angular/core';
import { SEEDS } from 'src/app/pets/models/data/animals';
import { FormControl } from '@angular/forms';
import { AddPetService } from 'src/app/pets/add-pet.service';

@Component({
  selector: 'app-seeds-category',
  templateUrl: './seeds-category.component.html',
  styleUrls: ['./seeds-category.component.scss']
})
export class SeedsCategoryComponent implements OnInit {

  SEEDS: any[] = SEEDS;
  seedCtrl: FormControl;
  isSubmitted: boolean = false;

  constructor(
    private addPetService: AddPetService,
  ) {
      this.seedCtrl = addPetService.seedsCtrl;
   }

 

  ngOnInit() {
    this.addPetService
          .isSubmitted
          .subscribe( isSubmitted => this.isSubmitted = isSubmitted );
  }

}
