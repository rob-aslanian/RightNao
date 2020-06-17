import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';

@Component({
  selector: 'app-career-center',
  templateUrl: './career-center.component.html',
  styleUrls: ['./career-center.component.scss']
})
export class CareerCenterComponent implements OnInit {

  constructor(
    public router:Router,
  ) { 
  }

  ngOnInit() { 
  }

}
