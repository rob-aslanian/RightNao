import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { PLANNING_TIME } from 'src/app/pets/models/data/animals';

@Component({
  selector: 'app-planting-time',
  templateUrl: './planting-time.component.html',
  styleUrls: ['./planting-time.component.scss']
})
export class PlantingTimeComponent implements OnInit {

  plantingTime: FormGroup;
  PLANNING_TIME = PLANNING_TIME;

  constructor(
    private addpetService: AddPetService
  ) {
    this.plantingTime = addpetService.planting;
   }

  ngOnInit() {
   const plants =  this.plantingTime.get('planting_time') as FormArray;
   if( plants.length > 0 ) return;
   PLANNING_TIME.map( ( plant ) => {
     plants.push(new FormGroup({
            id:      new FormControl(plant.id),
            name:    new FormControl(plant.name),
            checked: new FormControl(false)
     }))
   })
  }

  check( idx: number ) {
   const plants =  this.plantingTime.get('planting_time') as FormArray;
   plants.at(idx).get('checked')
         .setValue( !plants.at(idx).get('checked').value );   
  };

}
