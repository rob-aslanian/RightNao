import { Component, OnInit } from '@angular/core';
import { LIGHT_NEED } from 'src/app/pets/models/data/animals';
import { FormControl } from '@angular/forms';
import { AddPetService } from 'src/app/pets/add-pet.service';

@Component({
  selector: 'app-light-seeds',
  templateUrl: './light-seeds.component.html',
  styleUrls: ['./light-seeds.component.scss']
})
export class LightSeedsComponent implements OnInit {

  lightNeeds: any[] = LIGHT_NEED;
  ligthCtrl: FormControl;
  
  constructor(
    private addPetService: AddPetService
  ) {
      this.ligthCtrl = addPetService.lightCtrl;
   }

  ngOnInit() {  }

}
