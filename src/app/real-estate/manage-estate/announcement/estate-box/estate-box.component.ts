import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estate-box',
  templateUrl: './estate-box.component.html',
  styleUrls: ['./estate-box.component.scss']
})
export class EstateBoxComponent implements OnInit {

  @Output() result : EventEmitter<string> = new EventEmitter(); 

  isOptionActive: boolean = false; 

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  toggle() {

    this.isOptionActive === false ? this.isOptionActive = true : this.isOptionActive = false; 
  }; 

  routeToDetails ( id: string ) {
  
    this.router.navigate([`/real-estate/details/${id}`]); 

  }; 


  openModal ( modalType: string ) {

    this.result.emit(modalType); 
  
  }; 

}
