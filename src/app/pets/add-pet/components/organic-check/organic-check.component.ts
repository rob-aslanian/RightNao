import { Component, OnInit } from '@angular/core';
import { SUB_CATEGORY } from 'src/app/pets/models/model';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-organic-check',
  templateUrl: './organic-check.component.html',
  styleUrls: ['./organic-check.component.scss']
})
export class OrganicCheckComponent implements OnInit {

  SUB_CATEGORY = SUB_CATEGORY; 
  oranicCtrl: FormControl;

  constructor(
    private addPetService: AddPetService
  ) {
    this.oranicCtrl = addPetService.organicCtrl;
   }

  ngOnInit() {
  }

}
