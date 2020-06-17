import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-demo-network',
  templateUrl: './demo-network.component.html',
  styleUrls: ['./demo-network.component.scss', '../landing-page.component.scss']
})
export class DemoNetworkComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  clickRedericTo(){
this.route.navigate(['/registration']);



  }
}
