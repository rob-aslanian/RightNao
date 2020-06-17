import { Component, OnInit } from '@angular/core';
import { PetService } from '../../pet.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-saved',
  templateUrl: './manage-saved.component.html',
  styleUrls: ['./manage-saved.component.scss']
})
export class ManageSavedComponent implements OnInit {

  pets = [];
  isLoading:boolean = true;

  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  first:number = 10;
  amount:number;
  page:number = 1;


  constructor(
    private petsService:PetService
  ) { }

  ngOnInit() {
    this.petsService.GetSavedPetPlants({
      first: 10,
       after: '20'
    })
    .subscribe( data => console.log(data) )
  }

}
