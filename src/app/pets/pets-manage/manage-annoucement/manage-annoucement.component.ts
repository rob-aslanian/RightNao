import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PetService } from '../../pet.service';
import { switchMap } from 'rxjs/operators';
import { SearchService } from 'src/app/search/search.service';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';

@Component({
  selector: 'app-manage-annoucement',
  templateUrl: './manage-annoucement.component.html',
  styleUrls: ['./manage-annoucement.component.scss']
})
export class ManageAnnoucementComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: false }) _modal:AppModalComponent;
  modalType;

  pets = [];
  petForManage;
  isLoading:boolean = true;

  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  first:number = 10;
  amount:number;
  page:number = 1;

  filter:BehaviorSubject<{}> = new BehaviorSubject<{}>({
    category: 'Category_Any',
    deal_type: 'DealType_Any',
    status: 'PostStatus_Active',
    is_organic: false,
    publication_date: 'Date_Any',
    by_user: false,
    by_agent: false,
    profile_id: this.petsService.profileId
  }); 

  constructor(
    private petsService:PetService,
    private searchService:SearchService
  ) { }

  ngOnInit() {
    this.filter
        .pipe( switchMap( (filter) => this.getAnnouncement(filter) ) )
        .subscribe( data => { 
                              this.isLoading = false; 
                              this.pets = data['pet_plants'];
                              this.amount = data['amount_of_results'];
                              console.log('pets', data)
                            } )
  }

  getAnnouncement(filter){
    return this.after
              .pipe (
                switchMap( after => this.searchService
                                        .searchPetPlant( {
                                            first: this.first,
                                            after
                                        }, filter ))
              )
  }

  changePage(e){
    let page = e ===  1 ? 0 : 
               this.first * --e;
 
    this.after.next(String(page));
     
   }

   updateSearch(filter) {
     this.isLoading = true;
     this.filter.next(filter);
   }


   manage(manageCongig){
     switch (manageCongig.action) {
      case 'remove': this.removePet(manageCongig.id)
      break;
      case 'urgent': this.openModal(manageCongig.id, 'Urgent')
      break;
      // case 'urgent': this.makeUrgent(manageCongig.id)
      // break;
      case 'discounted': this.openModal(manageCongig.id, 'Discounted')
      break;
      case 'notifications': this.openModal(manageCongig.id, 'Notifications')
      break;
       default:
         break;
     }
   }

   removePet(id){
     console.log('remove');
     
     this.petsService.RemovePetsPlants(id)
                      .subscribe( data => this.pets = this.pets.filter( el => el.id != id ) );

   }
   openModal(id, title){
    this.petForManage = this.pets.find( el => el.id == id );
    console.log('petformanage',this.petForManage);
    
    this._modal.open();
    this.modalType = title;
    this._modal.title = title; 

   }
   closeModal(e) {
     console.log(e);
     this.modalType = '';
    this._modal.close(); 
  }


}