import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
  
  @Input() 
     profile: any

  constructor() { }

  ngOnInit() { }

}
 