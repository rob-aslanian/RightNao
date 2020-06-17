import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pet-details-author',
  templateUrl: './pet-details-author.component.html',
  styleUrls: ['./pet-details-author.component.scss']
})
export class PetDetailsAuthorComponent implements OnInit {
  @Input() profile;
  
  constructor() { }

  ngOnInit() {
    console.log('pgo',this.profile.phones);
  }

}
