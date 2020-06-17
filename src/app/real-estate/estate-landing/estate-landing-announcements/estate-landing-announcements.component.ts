import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-estate-landing-announcements',
  templateUrl: './estate-landing-announcements.component.html',
  styleUrls: ['./estate-landing-announcements.component.scss']
})
export class EstateLandingAnnouncementsComponent implements OnInit {

  isCardView: boolean = true;

  @Input() homies: any[] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.homies);
    
  }

}
