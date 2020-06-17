import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import Abbr from 'src/assets/data/en/countries';
import { ILocation } from 'src/app/_shared/models/company/location.interface';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  
  private _companyProfile;

  @Input() isAdmin:boolean = false;
  @Input() 
        set companyProfile(value:any){

            if(value['addresses']){
              this.locations = value['addresses'];
              
            }
            this._companyProfile = value;
        };

        get companyProfile(){
          return this._companyProfile;
        }

  @ViewChild(AppModalComponent, { static: true ,  }) modal:AppModalComponent;
  
  hasAbout: boolean = false;
  locations:ILocation[] = [];
  countrieAbbr = Abbr;
  modelType:string =  null;
  startPage:number = 1;
  editableLocation:ILocation;

  constructor(
     private translate: TranslateService
  ) { }

  ngOnInit() {
    console.log(this.locations);
    
  }


  getLocation(location:ILocation){
    
    if(location){
      let { _close , _type } = location,
           indexOfLocation = this.locations.findIndex(loc => loc.id === location.id);


      /// Add location ///
      if(_type === 'add'){
        this.locations.unshift(location);
      }

      /// Edit location ///
      if(_type){
        if(indexOfLocation > -1){
          this.locations[indexOfLocation] = location;
        }
      }

      /// Delete location ///
      if(_type === 'delete'){
        if(indexOfLocation > -1){
          this.locations.splice(indexOfLocation , 1);
        }
      }

     // this.startPage = this.locations.length;

      _close ? this.modal.close() : null;
    }
    
  }
  


  open(edit?:boolean , data?:ILocation){

    if(edit){
      this.editableLocation = data;
      this.modelType = 'edit';
      // this.modal.$title = this.translate.get('868');
      this.modal.title = "Edit Location";


    }else{
      
      this.modelType = 'add';
      this.modal.$title = this.translate.get('80');
    }
          
    this.modal.open();
  }

  openEmptyModal() {
    this.open( false );
  }

}
