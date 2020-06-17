import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-organic',
  templateUrl: './organic.component.html',
  styleUrls: ['./organic.component.scss']
})
export class OrganicComponent implements OnInit {

  orgCtrl: FormControl;

  constructor(
    private petService: AddPetService
  ) { 
    this.orgCtrl = petService.isOrganicCtrl;
  }

  ngOnInit() {
  }

}
