import { Component, OnInit } from '@angular/core';
import { AddPetService } from 'src/app/pets/add-pet.service';
import { FormControl } from '@angular/forms';
import { RegionService } from 'src/app/_shared/region.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  location: FormControl;
  locations: any[] =[];
  isSubmitted: boolean = false;

  constructor(
    private addPetService: AddPetService,
    private regionService: RegionService
  ) {
      this.location = addPetService.location;
   }

  ngOnInit() {
      this.regionService
          .getListOfCountries().subscribe( data => this.locations = data );

      this.addPetService
          .isSubmitted
          .subscribe( isSubmitted => this.isSubmitted = isSubmitted );

  }

}
