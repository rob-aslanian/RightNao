import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-services-header',
  templateUrl: './manage-services-header.component.html',
  styleUrls: ['./manage-services-header.component.scss']
})
export class ManageServicesHeaderComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.router.url);
    
  }

}
