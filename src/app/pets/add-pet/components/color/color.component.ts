import { Component, OnInit } from '@angular/core';
import { COLORS } from 'src/app/pets/models/model';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  colors = COLORS;
  colorControl: FormControl;
  
  constructor(
    private petService: AddPetService,
  ) { 
    this.colorControl = petService.colorCtrl;
  }

  ngOnInit() {

  }
 
}
