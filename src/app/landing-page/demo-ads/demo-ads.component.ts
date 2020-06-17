import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-demo-ads',
  templateUrl: './demo-ads.component.html',
  styleUrls: ['./demo-ads.component.scss', '../landing-page.component.scss']
})
export class DemoAdsComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  rederictTo(){
    this.route.navigate(['/registration']);

  }
}
