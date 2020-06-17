import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PetService } from '../../pet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets-box',
  templateUrl: './pets-box.component.html',
  styleUrls: ['./pets-box.component.scss']
})
export class PetsBoxComponent implements OnInit {
  @Input() isCardView: boolean = true;
  @Input() pet;
  @Output() onManage:EventEmitter<any> = new EventEmitter<any>();

  files:string[] = [];
  counter: number = 0;


  constructor(
    private petsService:PetService,
    private route:Router
  ) { }

  ngOnInit() {
    this.files = this.pet.common.files.map( file => `/file/${file.address}` );
    console.log(this.pet.common.post_status);
  }


  //manage
  manage(action){
    let manageCongig = {
      action,
      id: this.pet.id
    };
    this.onManage.emit(manageCongig);
  }
  
  removePet(){
    this.petsService.RemovePetsPlants(this.pet.id)
                    .subscribe( data => console.log('has removed') )
  }

  changePetStatus(id, status){
    this.petsService.ChangePetsPlantsStatus(id, status )
                    .subscribe( data => console.log(status))
  }

  edit(id) {
    this.route.navigate(['pets/edit-pet', id])
  }

  //manage


  //like || unlike
  changeLikeStatus(){
    let mutate = this.pet.common.has_liked ? 
                  this.petsService.UnLikePetPlant(this.pet.id) : 
                  this.petsService.LikePetPlan(this.pet.id);

    mutate.subscribe( data => this.pet.common.has_liked = !this.pet.common.has_liked )
    
  }

  nextImage(e) {
  
    const target = e.target;
    
    if( this.files.length > 1 && !target.firstChild.classList.contains('slider-file') ) {
      target.firstChild.classList.add('slider-file');    
    
        setTimeout( () => {
            target.firstChild.classList.remove('slider-file');
            this.files[this.counter + 1] ? ++this.counter : this.counter = 0;
          }, 1000 );
        }
    }

}
