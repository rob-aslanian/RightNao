import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-demo-messaging',
  templateUrl: './demo-messaging.component.html',
  styleUrls: ['./demo-messaging.component.scss', '../landing-page.component.scss']
})
export class DemoMessagingComponent implements OnInit {

  constructor( private route:Router) { }

  ngOnInit() {
  }
  rederictTo(){
this.route.navigate(['/registration']);

  }
}
