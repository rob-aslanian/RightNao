import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormControl } from '@angular/forms';
import { SEASON } from 'src/app/pets/models/data/animals';

@Component({
  selector: 'app-flowers-season',
  templateUrl: './flowers-season.component.html',
  styleUrls: ['./flowers-season.component.scss']
})
export class FlowersSeasonComponent implements OnInit {

  season: any[] = SEASON;
  flowCtrl: FormControl;

  constructor(
    private addPetService: AddPetService
  ) {
    this.flowCtrl = addPetService.flowerCtrl;
   }

  ngOnInit() {}

}
