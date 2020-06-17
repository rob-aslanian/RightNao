import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task-popover',
  templateUrl: './add-task-popover.component.html',
  styleUrls: ['./add-task-popover.component.scss']
})
export class AddTaskPopoverComponent implements OnInit {

  reminder:string;
    
  constructor() { }

  ngOnInit() {
  }

}
