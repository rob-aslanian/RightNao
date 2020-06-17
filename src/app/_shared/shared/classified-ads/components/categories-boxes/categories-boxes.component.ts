import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories-boxes',
  templateUrl: './categories-boxes.component.html',
  styleUrls: ['./categories-boxes.component.scss']
})
export class CategoriesBoxesComponent implements OnInit {

  /**
   * @example 
   * { src: '', name: '', title: '', path: '' }
   */

  @Input() cat;
  constructor() { }

  ngOnInit() {
  }

}
