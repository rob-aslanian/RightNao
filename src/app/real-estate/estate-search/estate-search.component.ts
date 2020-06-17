import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estate-search',
  templateUrl: './estate-search.component.html',
  styleUrls: ['./estate-search.component.scss']
})
export class EstateSearchComponent implements OnInit {

  searchKeyword: string; 


  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit() {

    this.searchKeyword = this.router.snapshot.params.id; 
    console.log(this.searchKeyword);
    
    
  }; 



}
