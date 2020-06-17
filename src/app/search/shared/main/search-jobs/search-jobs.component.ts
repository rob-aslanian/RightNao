import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-jobs',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.scss']
})
export class SearchJobsComponent implements OnInit {

  @Input() jobList;
  @Input() amount:number;

  job;
  
  constructor() { }

  ngOnInit() {
    
  }

}
