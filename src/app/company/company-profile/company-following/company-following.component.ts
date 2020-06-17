import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-following',
  templateUrl: './company-following.component.html',
  styleUrls: ['./company-following.component.scss']
})
export class CompanyFollowingComponent implements OnInit {

  isPeople:boolean = false;

  constructor(
    private router:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(
      (data) => this.isPeople = data['type'] === 'people'
    )

  }

  setRoute() {

  }
  
  
}
