import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../../services.service';


@Component({
  selector: 'app-manage-services-saved-services',
  templateUrl: './manage-services-saved-services.component.html',
  styleUrls: ['./manage-services-saved-services.component.scss']
})
export class ManageServicesSavedServicesComponent implements OnInit, OnDestroy {

  allSavedServices: any[] = []; 
  allFilteredServices: any[] = []; 

  isOptionsActive: boolean = false; 
  isFiltered: boolean = false; 
  optionTitle: string = 'All'; 

  constructor(
    private servicesService: ServicesService, 

  ) { }

  ngOnInit() {
    this.getSavedVOfficeServices(); 

  }

  getSavedVOfficeServices() {
    return this.servicesService.getSavedVOfficeServices()
                               .subscribe(data => {
                                
                                this.allSavedServices = data['data']['GetSavedVOfficeServices']['services'];
                                
                                console.log(this.allSavedServices);
                                 
                               }, err => {
                                 console.log(err);
                                 
                               })
  }; 

  toggleOptions(optionType: string) {
    this.isOptionsActive === false ? this.isOptionsActive = true : this.isOptionsActive = false; 
    
    switch (optionType) {
      case 'all':
          this.optionTitle = 'All'; 
          this.isFiltered = false; 
        break;
      case 'latest' : 
          this.optionTitle = 'Latest'; 
        break; 
      case 'low' : 
          this.optionTitle = 'Price - Lowest First';
          if ( !this.isFiltered ) {
            const lowest = this.allSavedServices.sort( ( a ,b ) => a.fixed_price_amount - b.fixed_price_amount ); 
            return this.allSavedServices =  lowest;  
          } else {
            const lowest = this.allFilteredServices.sort( ( a ,b ) => a.fixed_price_amount - b.fixed_price_amount ); 
            return this.allFilteredServices =  lowest;  
            
          }
          
  
      case 'high' : 
          this.optionTitle = 'Price - Highest First'
          if ( !this.isFiltered ) {
            const highest = this.allSavedServices.sort( ( a ,b ) => b.fixed_price_amount - a.fixed_price_amount ); 
            return this.allSavedServices =   highest;
          } else {
            const highest = this.allFilteredServices.sort( ( a ,b ) => b.fixed_price_amount - a.fixed_price_amount ); 
            return this.allFilteredServices =   highest;
            
          }
    
      case 'best' : 
          this.optionTitle = 'Best Selling'; 
        break

      
    }

  }; 


  filterSavedServices(keyWord: string) {

    this.allFilteredServices =  this.allSavedServices.filter( item => {
      
      if ( item.title.toLowerCase() === keyWord.trim().toLowerCase()) {     
        
        console.log("filtered");   
        this.isFiltered = true; 
        return item; 
      } 

    })
     
  }; 


  ngOnDestroy(): void {
   
    this.getSavedVOfficeServices().unsubscribe(); 

  }

}
