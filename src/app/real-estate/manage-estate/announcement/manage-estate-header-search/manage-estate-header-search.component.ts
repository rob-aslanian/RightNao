import { Component, OnInit, EventEmitter, Output, DoCheck, Input } from '@angular/core';
import { propertyTypes } from 'src/app/real-estate/Shared/models/estate.interface';
import { RealEstateService } from 'src/app/real-estate/add-estate/Service/real-estate.service';
 
@Component({
  selector: 'app-manage-estate-header-search',
  templateUrl: './manage-estate-header-search.component.html',
  styleUrls: ['./manage-estate-header-search.component.scss']
})
export class ManageEstateHeaderSearchComponent implements OnInit {

  @Output() 
        result: EventEmitter<string> = new EventEmitter(); 
  @Input() 
       withoutType: boolean = true;
       
  propertyTypes = propertyTypes;
  
  template: any = {
        query: '',
        propertyType: '',
        status: '' 
  };


  constructor(
    private search: RealEstateService
  ) { }

  ngOnInit() {}

  openModal(modalType: string) {

    switch (modalType) {
      case 'offers'  :
         this.result.emit('offers'); 
        break;
      case 'alerts' :  
         this.result.emit('alerts'); 
        break; 
      case 'notifications' : 
         this.result.emit('notifications'); 
  
    }

  }
 
  searchByTemplate( ) {
       this.search
           .search.next(this.template); 
  }  
 
}
