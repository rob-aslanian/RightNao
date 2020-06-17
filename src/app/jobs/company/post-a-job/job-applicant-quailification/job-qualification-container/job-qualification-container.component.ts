import { Component, OnInit, Input } from '@angular/core';
import { IJobQualification } from 'src/app/_shared/models/jobs/jobs.interface';

@Component({
  selector: 'app-job-qualification-container',
  templateUrl: './job-qualification-container.component.html',
  styleUrls: ['./job-qualification-container.component.scss']
})
export class JobQualificationContainerComponent implements OnInit {

  @Input() data:IJobQualification;
  
  constructor() { }

  ngOnInit() {
  }

}
