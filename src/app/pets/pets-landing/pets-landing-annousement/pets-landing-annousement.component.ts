import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pets-landing-annousement',
  templateUrl: './pets-landing-annousement.component.html',
  styleUrls: ['./pets-landing-annousement.component.scss']
})
export class PetsLandingAnnousementComponent implements OnInit {

  isCardView: boolean = true;
  
  @Input() pets;
  

  constructor() { }

  ngOnInit() {
  }

}
