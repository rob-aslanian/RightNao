import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { Job_Period } from 'src/app/_shared/models/shared/shared.models';
import { SearchService } from 'src/app/search/search.service';
import { SearchByType, SERVICE_PRICE } from 'src/app/search/models/search.model';

@Component({
  selector: 'app-search-salary-column',
  templateUrl: './search-salary-column.component.html',
  styleUrls: ['./search-salary-column.component.scss']
})
export class SearchSalaryColumnComponent implements OnInit {

  interlvals = Job_Period;
  currencies = utilities.getAllCurency();
  form:FormGroup;
  type:SearchByType = 'job';

  controlName:string = 'period';
  title:string = "Salary";

  constructor(
    private seaechService:SearchService
  ) { 
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.type = this.seaechService.type;

    if (this.type === 'service' || this.type === 'service_request') {
        this.interlvals = SERVICE_PRICE;
        this.controlName = "price";
        this.title = "Price"
      
    }
  }

  get price_type() : string{
    if (this.type === 'service' || this.type === 'service_request' ){
      return  this.form.get('price').value
    }
  }

}
