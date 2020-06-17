import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dream-job',
  templateUrl: './dream-job.component.html',
  styleUrls: ['./dream-job.component.scss']
})
export class DreamJobComponent implements OnInit {

  headTitle: string = 'Find the job of your dream';

  @Input() set title( value ) {
      if( value ) {
          this.headTitle = value;
      }
  }
  constructor() { }

  ngOnInit() {
  }

}
