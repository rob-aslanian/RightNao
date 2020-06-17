import { Component, OnInit, Input } from '@angular/core';
 
@Component({
  selector: 'app-additinioal-details',
  templateUrl: './additinioal-details.component.html',
  styleUrls: ['./additinioal-details.component.scss',
              '../../../../../../_shared/style.scss']
})

export class AdditinioalDetailsComponent implements OnInit {

 @Input() qualifications;
 

  constructor() { }

  ngOnInit() {
  }
  addQual() {
 
  }
}
