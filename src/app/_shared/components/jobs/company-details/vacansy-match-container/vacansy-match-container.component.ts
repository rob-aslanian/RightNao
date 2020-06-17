import { Component, OnInit, Input } from '@angular/core';
import { IJobQualification } from 'src/app/_shared/models/jobs/jobs.interface';

@Component({
  selector: 'app-vacansy-match-container',
  templateUrl: './vacansy-match-container.component.html',
  styleUrls: ['./vacansy-match-container.component.scss']
})
export class VacansyMatchContainerComponent implements OnInit {

  @Input() data:IJobQualification;
  @Input() type:string;
  
  constructor() { }

  ngOnInit() {

  }

}
