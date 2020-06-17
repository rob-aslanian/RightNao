import { Component, OnInit } from '@angular/core';
import { AddPetService } from '../../add-pet.service';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { RegionService } from 'src/app/_shared/region.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  informationForm: FormGroup;
  isSubmitted: boolean = false ;
  countryCodes: number[] = [];

  constructor(
    private addPetService: AddPetService,
    private regionService:RegionService,
    private activatedRoute: ActivatedRoute

  ) {
      this.informationForm = addPetService.information
   }

  ngOnInit() {
    this.addPetService
        .isSubmitted
        .subscribe( isSubmitted => this.isSubmitted = isSubmitted );

    this.regionService
        .getListOfCountryCodes()
        .subscribe(({ data }) => this.countryCodes = data['getListOfCountryCodes'] ); 
          
  }

  addPhone() {
    (this.informationForm.get('phones') as FormArray)
         .push(new FormGroup({ number: new FormControl('', Validators.required ), country_code_id: new FormControl('', Validators.required ) }))
  };


}
