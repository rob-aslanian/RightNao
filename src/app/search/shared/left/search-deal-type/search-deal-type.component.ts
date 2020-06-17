import { Component, OnInit } from '@angular/core';
import { DEAL_TYPE_WITH_PROPERTIES } from 'src/app/real-estate/Shared/models/estate-model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-deal-type',
  templateUrl: './search-deal-type.component.html',
  styleUrls: ['./search-deal-type.component.scss']
})
export class SearchDealTypeComponent implements OnInit {

  dealTypes = DEAL_TYPE_WITH_PROPERTIES;
  startPage:number= 4;
  form:FormGroup;
  showMain:boolean = true;
  showSub:boolean = false;
  selectedDealType:object;
  selectedProperty:object;
  
  constructor(
    private f:FormBuilder,
  ) {
    this.form = f.group({});
   }

  ngOnInit() {
  }

  selectItem(e:Event , data:any , type:string){
    e.preventDefault();

    this.form
        .get('property_type')
        .reset()

    this.form
        .get(type)
        .setValue(data['key']);
  
    switch (type) {
      case 'deal_type':
        this.showSub = false;
        this.showMain = !this.showMain;
        this.selectedDealType = data;
        break;
      case 'property_type':
        this.showMain = false;
        this.showSub = !this.showSub;
        this.selectedProperty = data;
      default:
        break;
    }

  }

}
