import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-demo-jobs-company',
  templateUrl: './demo-jobs-company.component.html',
  styleUrls: ['./demo-jobs-company.component.scss', '../landing-page.component.scss']
})
export class DemoJobsCompanyComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  rederictTo(){
this.route.navigate(['/registration/company_sign_in']);

  }
}
