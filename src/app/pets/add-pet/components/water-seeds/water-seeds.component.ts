import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { WATER_NEED } from 'src/app/pets/models/data/animals';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-water-seeds',
  templateUrl: './water-seeds.component.html',
  styleUrls: ['./water-seeds.component.scss']
})
export class WaterSeedsComponent implements OnInit {

  waterNeeds: any[] = WATER_NEED;
  waterCtrl: FormControl;

  constructor(
    private addPetService: AddPetService
  ) {
    this.waterCtrl = addPetService.waterCtrl;
   }

  ngOnInit() { }

}
