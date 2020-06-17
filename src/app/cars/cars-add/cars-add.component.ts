import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars-add',
  templateUrl: './cars-add.component.html',
  styleUrls: ['./cars-add.component.scss']
})
export class CarsAddComponent implements OnInit {

  constructor(
    private activeRoute:ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe( data => console.log(data) );
  }

}
