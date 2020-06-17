import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pets-landing-header',
  templateUrl: './pets-landing-header.component.html',
  styleUrls: ['./pets-landing-header.component.scss']
})
export class PetsLandingHeaderComponent implements OnInit {
  brandList = [];

  constructor() { }

  ngOnInit() {
  }

}
