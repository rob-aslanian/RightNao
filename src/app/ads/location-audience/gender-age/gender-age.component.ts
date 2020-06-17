import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gender-age',
  templateUrl: './gender-age.component.html',
  styleUrls: ['./gender-age.component.scss']
})
export class GenderAgeComponent implements OnInit {
  gender;
age_from;
age_to;

  constructor() { }

  ngOnInit() {
  }

}
