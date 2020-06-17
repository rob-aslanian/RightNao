import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { LANDSCAPE_USED } from 'src/app/pets/models/data/animals';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-landscape-used',
  templateUrl: './landscape-used.component.html',
  styleUrls: ['./landscape-used.component.scss']
})
export class LandscapeUsedComponent implements OnInit {

  landNeeds: any[] = LANDSCAPE_USED;
  landCtrl: FormControl;
  
  constructor(
    private addPetService: AddPetService
  ) {
    this.landCtrl = addPetService.landCtrl;
    
  }

  ngOnInit() { }

}
