import { Component, OnInit, Input } from '@angular/core';
import { IJobMatcher } from 'src/app/_shared/models/jobs/jobs.interface';;

@Component({
  selector: 'app-vacansy-match',
  templateUrl: './vacansy-match.component.html',
  styleUrls: ['./vacansy-match.component.scss']
})
export class VacansyMatchComponent implements OnInit {

  @Input() data:IJobMatcher;

  constructor(
  ) {  }

  ngOnInit() {
    
  }

}
