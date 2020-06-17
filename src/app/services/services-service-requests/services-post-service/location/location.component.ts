import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-service-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss', '../services-post-service.component.scss']
})
export class LocationComponent implements OnInit {

  @Input() location: FormGroup;
  
  get locatCtrls() {
      return this.location.controls;
  }
  constructor() { }

  ngOnInit() {
  }

}
