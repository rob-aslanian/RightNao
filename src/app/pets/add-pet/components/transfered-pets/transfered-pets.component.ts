import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transfered-pets',
  template: `
    <div class="custom-control custom-checkbox mt-4">
        <input  type='checkbox' class="custom-control-input" id="save-address" [formControl]='transCtrl'/>
        <label class="custom-control-label" for="save-address">Pet can be transformed to</label>
    </div>
  `
})
export class TransferedPetsComponent implements OnInit {

  transCtrl: FormControl

  constructor(
    private addPetService: AddPetService
  ) { 
    this.transCtrl = addPetService.transported;
  }

  ngOnInit() {
  }

}
