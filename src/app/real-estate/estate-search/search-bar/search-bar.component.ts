import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  keyWord: string; 

  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit() {

    this.keyWord = this.router.snapshot.params.id; 

  }

}
