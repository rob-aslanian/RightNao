import { Component, OnInit } from '@angular/core';
import { SUB_CATEGORY } from 'src/app/pets/models/model';
import { FormControl } from '@angular/forms';
import { AddPetService } from 'src/app/pets/add-pet.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  SUB_CATEGORY = SUB_CATEGORY;
  subCtrl: FormControl;
  
  constructor(
    private petService: AddPetService
  ) { 
    this.subCtrl = petService.subCtrl;
  }

  ngOnInit() {
  }

}
