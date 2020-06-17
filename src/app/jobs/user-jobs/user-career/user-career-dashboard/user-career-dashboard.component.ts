import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-career-dashboard',
  templateUrl: './user-career-dashboard.component.html',
  styleUrls: ['./user-career-dashboard.component.scss']
})
export class UserCareerDashboardComponent implements OnInit {

  career;

  constructor(
    private activeRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    const data = this.activeRoute.parent.snapshot.data.career;

    if(data){
      this.career = data['career_interests'];
    }
  }

}
