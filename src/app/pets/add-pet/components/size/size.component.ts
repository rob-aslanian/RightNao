import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {

  size: FormControl;

  constructor(
    private petService: AddPetService
  ) {
    this.size = petService.sizeCtrl;
  }

  ngOnInit() {
  }

}
