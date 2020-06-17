import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-manage-search',
  templateUrl: './manage-search.component.html',
  styleUrls: ['./manage-search.component.scss']
})
export class ManageSearchComponent implements OnInit {

  @Input() onlyMe = true;

  filter = {
    keywords: undefined,
    category: 'Category_Any',
    deal_type: 'DealType_Any',
    status: 'PostStatus_Active',
    is_organic: false,
    publication_date: 'Date_Any',
    by_user: false,
    by_agent: false,
  }

  @Output() search:EventEmitter<{}> = new EventEmitter<{}>();

  category = [
    {
      text: 'Any',
      type: 'Category_Any'
    },
    {
      text:'Animal',
      type: 'Category_Animals'
    },
    {
      text:'Food & Accessories',
      type: 'Category_FoodAccessories'
    },
    {
      text:'Seeds',
      type: 'Category_Seeds'
    },
    {
      text:'Plants',
      type: 'Category_Plants'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

  emitSearch() {
    this.filter.keywords = this.filter.keywords ? this.filter.keywords : undefined;
    console.log(this.filter.keywords);
    this.search.emit(this.filter);
  }
  searchByCategory(e) {
    this.filter.category = e.target.value;
    this.search.emit(this.filter);
  }

  changeStatus(status) {
    console.log('ddd');
    
    this.filter.status = status;
    this.search.emit(this.filter);
  }

}
