import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-column-header',
  templateUrl: './search-column-header.component.html',
  styleUrls: ['./search-column-header.component.scss']
})
export class SearchColumnHeaderComponent implements OnInit {

  @Input() title:string;
  
  isOpen:boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
