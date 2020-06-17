import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-left-menu',
  templateUrl: './search-left-menu.component.html',
  styleUrls: ['./search-left-menu.component.scss']
})
export class SearchLeftMenuComponent implements OnInit {

  dealTypes = {
    
    isLocationActive: true,  
    isPriceActive: true, 
    isSizeActive: true, 
    isPubActive: true,
    isBathActive: true,
    isBedroomActive: true,
    isTypeOfHomeActive: true,
    isOutdoorActive: true,
    isIndoorActive: true,
    isClimateActive: true,
    isStatusActive: true,
    isFloorActive: true,
    isCarSpaceActive: true
  
  }; 


  dealTypeTitle: string; 
  dealPropertyTitle: string; 

  dealTypeMenus = { 
    
    default: true,
    subMenu: false, 

  }; 


  constructor() { }

  ngOnInit() {

  }

  toggleArrow(type: string) {

    switch (type) {
      case 'location' :
        this.dealTypes.isLocationActive === false ? this.dealTypes.isLocationActive = true : this.dealTypes.isLocationActive = false; 
        break;
      case 'price' :
        this.dealTypes.isPriceActive === false ? this.dealTypes.isPriceActive = true : this.dealTypes.isPriceActive = false;
        break;
      case 'size' :
        this.dealTypes.isSizeActive === false ? this.dealTypes.isSizeActive = true : this.dealTypes.isSizeActive = false; 
        break; 
      case 'pub' : 
        this.dealTypes.isPubActive === false ? this.dealTypes.isPubActive = true : this.dealTypes.isPubActive = false; 
        break; 
      case 'type-of-home' : 
        this.dealTypes.isTypeOfHomeActive === false ? this.dealTypes.isTypeOfHomeActive = true : this.dealTypes.isTypeOfHomeActive = false; 
        break; 
      case 'bedrooms' :
          this.dealTypes.isBedroomActive === false ? this.dealTypes.isBedroomActive = true : this.dealTypes.isBedroomActive = false; 
        break
      case 'bathrooms' :
          this.dealTypes.isBathActive === false ? this.dealTypes.isBathActive = true : this.dealTypes.isBathActive = false; 
        break
      case 'car-spaces' :
          this.dealTypes.isCarSpaceActive === false ? this.dealTypes.isCarSpaceActive = true : this.dealTypes.isCarSpaceActive = false; 
        break
      case 'outdoor' :
          this.dealTypes.isOutdoorActive === false ? this.dealTypes.isOutdoorActive = true : this.dealTypes.isOutdoorActive = false; 
        break
      case 'indoor' :
          this.dealTypes.isIndoorActive === false ? this.dealTypes.isIndoorActive = true : this.dealTypes.isIndoorActive = false; 
        break
      case 'climate' :
          this.dealTypes.isClimateActive === false ? this.dealTypes.isClimateActive = true : this.dealTypes.isClimateActive = false; 
        break
      case 'status' :
          this.dealTypes.isStatusActive === false ? this.dealTypes.isStatusActive = true : this.dealTypes.isStatusActive = false; 
        break
      case 'floor' :
          this.dealTypes.isFloorActive === false ? this.dealTypes.isFloorActive = true : this.dealTypes.isFloorActive = false; 
        break
    };

  };

  toggleDealType(type: string, dealType?: string) {

    //  * * * Clear dealType Menu's * * *
    for ( let key in this.dealTypeMenus ) {

      if( this.dealTypeMenus.hasOwnProperty(key) ) {

        this.dealTypeMenus[key] = false; 
        
      };   
    }; 

    switch (type) {
      case 'showSubMenu' :
       this.dealTypeMenus.default = false
       this.dealTypeTitle = dealType; 
        break;

      case 'hideSubmenu' : 
      this.dealTypeMenus.default = true; 
        break; 

      case 'showDetailedInfo' :
        this.dealPropertyTitle = dealType;  
        this.dealTypeMenus.subMenu = true; 
        break; 
    }; 
  }; 

}
