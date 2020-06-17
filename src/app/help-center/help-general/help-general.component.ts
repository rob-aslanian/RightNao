import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-general',
  templateUrl: './help-general.component.html',
  styleUrls: ['./help-general.component.scss']
})
export class HelpGeneralComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }

}
