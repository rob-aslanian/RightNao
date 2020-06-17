import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-demo-jobs-user',
  templateUrl: './demo-jobs-user.component.html',
  styleUrls: ['./demo-jobs-user.component.scss', '../landing-page.component.scss']
})
export class DemoJobsUserComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  rederictTo(){
this.route.navigate(['/registration/user']);


  }
}
