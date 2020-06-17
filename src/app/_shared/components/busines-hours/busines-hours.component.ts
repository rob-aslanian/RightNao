import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IBuisnessHour } from '../../models/businessHours.interface';

@Component({
  selector: 'app-busines-hours',
  templateUrl: './busines-hours.component.html',
  styleUrls: ['./busines-hours.component.scss'],
  providers:[NgbTimepickerConfig]
})
export class BusinesHoursComponent implements OnInit {

  @Input() multiple:boolean = false;
  @Input() data;

  @Output() result: EventEmitter<IBuisnessHour | IBuisnessHour[]> = new EventEmitter<IBuisnessHour | IBuisnessHour[]>();

  dropdownListDays:any[];
  dropdownSettingsDays: object;
  disabledWeeks:boolean = false;

  busniessDate: IBuisnessHour[] = [];

  bhForm:FormGroup
  
  constructor(
    private f: FormBuilder,
    private timepickerConfig:NgbTimepickerConfig
  ) {
    timepickerConfig.spinners = false;


    this.bhForm = f.group({
       hours:f.array([this.initaliazeValue()]),
       business_hours:['select']
    })
   }


   initaliazeValue() : FormGroup{
      return this.f.group({
          week_days:[],
          hour_from:'',
          hour_to:''
      } as IBuisnessHour );
   }

   get Hours() : FormArray{
     return this.bhForm.get('hours') as FormArray;
   }

   removeAlphabet(e){
     let code = e.keyCode;
     return code >= 65 && code <= 90 ? e.target.value = '' : true;
   }


  ngOnInit() {

    this.dropdownSettingsDays = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      disabled:true,
    }

    this.dropdownListDays = [
      { item_id: 1, item_text: 'Monday' },
      { item_id: 2, item_text: 'Tuesday' },
      { item_id: 3, item_text: 'Wednesday' },
      { item_id: 4, item_text: 'Thursday' },
      { item_id: 5, item_text: 'Friday' },
      { item_id: 6, item_text: 'Saturday' },
      { item_id: 7, item_text: 'Sunday' }
    ];

    if(this.data) this.parseData();


    /// Get Values from form ///
    this.Hours.valueChanges.subscribe((hours: IBuisnessHour[]) => {

     
      if(hours && hours.length > 0){
        this.busniessDate = hours.map((hour) : IBuisnessHour =>  {
          let { week_days , hour_from , hour_to } = hour;

            /// Parse week days ///
            if(week_days && week_days.length > 0){
              week_days = week_days.sort((a,b) => a['item_id'] < b['item_id'] ? -1 : 1)
                                   .map(day => day['item_text'].toLowerCase() )
            }else week_days = [];


            /// Parse time ///
            if(hour_from){
              let hour   = hour_from['hour'] < 10 ? `0${hour_from['hour']}` :  hour_from['hour'], 
                  minute = hour_from['minute'] < 10 ? `0${hour_from['minute']}` :  hour_from['minute'];

              hour_from = `${hour}:${minute}`;
            }

            if(hour_to){
              let hour   = hour_to['hour'] < 10 ? `0${hour_to['hour']}` :  hour_to['hour'], 
                  minute = hour_to['minute'] < 10 ? `0${hour_to['minute']}` :  hour_to['minute'];

              hour_to   = `${hour}:${minute}`;
            }


            return {
              hour_from,
              hour_to,
              week_days
            } 

        });
      }

      this.result.emit(this.busniessDate);

    });

  }


  radioTypeChange(e){
    let value = e.target.value;

    if(value === 'select'){
      this.Hours.enable();
      this.disabledWeeks = false;
    }

    if(value === 'closed' || value === 'open'){
      this.Hours.disable();
      this.disabledWeeks = false;
    }

    if(value === 'open'){
      this.busniessDate.map(date => (
        date.hour_from = '0:00' , 
        date.hour_to = '0:00' , 
        date.week_days =  this.dropdownListDays.map(day => day['item_text'].toLowerCase()) )
      )
    }
    if(value === 'closed'){
      this.disabledWeeks = true;
      this.Hours.disable();
      this.busniessDate.map(date =>  ( date.hour_from = '',  date.hour_to = '',  date.week_days = []))
    }
    
  }

  dateToObject(date){
    if(date && date !== null){
      let hour = date ? +date.split(':')[0] : null,
          minute = date ? +date.split(':')[1] : null;

      return {
        hour,
        minute
      }
    }
  }

  weekDaysToObject(weeks:any[]){
    if(weeks && weeks.length > 0){
      return weeks.map((week , idx) => {
        return {
          item_id:++idx,
          item_text:`${week[0].toUpperCase()}${week.slice(1)}`
        }
      })
    }
  }

  parseData(){

    if(this.data.length > 0){   

      this.Hours.removeAt(0);  /// Remove default inputs 
      this.result.emit(this.data); /// Emit data 

      this.data.map(el => {
        let {  hour_from , hour_to , week_days} = el;        

              hour_from = this.dateToObject(hour_from);
              hour_to = this.dateToObject(hour_to);
              week_days = this.weekDaysToObject(week_days);


         this.Hours.push(this.f.group({
          hour_from:[hour_from],
          hour_to:[hour_to],
          week_days:[week_days]
         } as IBuisnessHour))
      })
      
    }

    
  }

  trackByFn =  (index) => index;

  addAnother(){
    return this.Hours.push(this.initaliazeValue());
  }

  removeItem(i: number){
    this.busniessDate.splice(i , 1); 
    return this.Hours.removeAt(i);
  }

}
