import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-type-of-project',
  templateUrl: './type-of-project.component.html',
  styleUrls: ['./type-of-project.component.scss', '../services-post-service.component.scss']
})
export class TypeOfProjectComponent implements OnInit {

  @Input() projectType: FormGroup; 

  constructor() { }

  ngOnInit() {
  }

}
