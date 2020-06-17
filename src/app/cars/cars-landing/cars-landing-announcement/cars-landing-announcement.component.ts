import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cars-landing-announcement',
  templateUrl: './cars-landing-announcement.component.html',
  styleUrls: ['./cars-landing-announcement.component.scss']
})
export class CarsLandingAnnouncementComponent implements OnInit {
  isCardView: boolean = true;

  @Input() cars: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
