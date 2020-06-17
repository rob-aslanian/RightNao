import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CarsModels } from '../../models/cars.model';

@Component({
  selector: 'app-manage-search',
  templateUrl: './manage-search.component.html',
  styleUrls: ['./manage-search.component.scss']
})
export class ManageSearchComponent implements OnInit {
  carsType = CarsModels;

  @Input() onlyMe = true;

  filter = {
    vehicle_type: 'CAR',
    mileage_unit: 'KM',
    is_only_me: this.onlyMe,
    keyword: '',
    status: 'active'
  }

  @Output() search:EventEmitter<{}> = new EventEmitter<{}>();

  constructor() { }

  ngOnInit() {
  }

  emitSearch() {
    this.search.emit(this.filter);
  }
  searchByType(e) {
    this.filter.vehicle_type = e.target.value;
    this.search.emit(this.filter);
  }

  changeStatus(status) {
    console.log('ddd');
    
    this.filter.status = status;
    this.search.emit(this.filter);
  }

}
