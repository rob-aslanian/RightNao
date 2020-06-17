import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CATEGORIES } from 'src/app/for-sale/models/model';
import { Category } from 'src/app/ads-services/models/models';

@Component({
  selector: 'app-manage-search',
  templateUrl: './manage-search.component.html',
  styleUrls: ['./manage-search.component.scss']
})
export class ManageSearchComponent implements OnInit {
  @Input() place:string;
  filter;
  @Output() search:EventEmitter<{}> = new EventEmitter<{}>();
  category = [];
  

  constructor() { 
    
  }

  ngOnInit() {
    console.log('search place', this.place);
    this.filter = this.createFilter(this.place);
    this.category = this.place == 'for-sale' ? CATEGORIES : Category;
  }

  emitSearch() {
    this.filter.keywords = this.filter.keywords ? this.filter.keywords : undefined;
    console.log(this.filter);
    this.search.emit(this.filter);

  }
  searchByCategory(e) {
    // this.filter.category = e.target.value;
    this.search.emit(this.filter);
  }

  changeStatus(status) {
    console.log('ddd');
    
    this.filter.status = status;
    this.search.emit(this.filter);
  }

  createFilter(place){
    console.log('p5435;acef',place);
    let params = place == 'for-sale' ? {condition:'Condition_Any'} : { service:'ServiceCategory_Any'};
      return {
        keywords:'',
        status:'PostStatus_Active',
        price_type:'PriceType_Any',
        publication_date:'Date_Any',
        by_agent:false,
        by_user:false,
        ...params
      }
  }

}





