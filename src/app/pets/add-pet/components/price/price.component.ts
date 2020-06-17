import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  isSubmitted: boolean  = false;
   price: FormGroup;

  constructor(
    private addPetService: AddPetService
  ) {
      this.price = addPetService.price;
   }

  ngOnInit() {
    this.addPetService
        .isSubmitted
        .subscribe( isSubmitted => this.isSubmitted = isSubmitted );

  }

}
