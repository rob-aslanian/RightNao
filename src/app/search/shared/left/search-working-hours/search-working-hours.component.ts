import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WorkingHours } from 'src/app/search/models/search.model';

@Component({
  selector: 'app-search-working-hours',
  templateUrl: './search-working-hours.component.html',
  styleUrls: ['./search-working-hours.component.scss']
})
export class SearchWorkingHoursComponent implements OnInit {

  dropdownListDays = [];
  dropdownSettingsDays;
  workingHours = WorkingHours;
  form:FormGroup;
  constructor() {
    this.form = new FormGroup({});

    this.dropdownSettingsDays = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select days',
      unSelectAllText: 'UnSelect days',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      disabled:true,
    }

    this.dropdownListDays = [
      { item_id: "monday", item_text: 'Monday' },
      { item_id: "tuesday", item_text: 'Tuesday' },
      { item_id: "wednesday", item_text: 'Wednesday' },
      { item_id: "thursday", item_text: 'Thursday' },
      { item_id: "friday", item_text: 'Friday' },
      { item_id: "saturday", item_text: 'Saturday' },
      { item_id: "sunday", item_text: 'Sunday' }
    ];


  }

  ngOnInit() {
  }

}
