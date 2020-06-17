import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-visibility',
  templateUrl: './visibility.component.html',
  styleUrls: ['./visibility.component.scss', '../services-post-service.component.scss']
})
export class VisibilityComponent implements OnInit {

  @Input() visibility: FormGroup; 

  constructor(
    private fb: FormBuilder 
  ) { }

  ngOnInit() {

  }

}
