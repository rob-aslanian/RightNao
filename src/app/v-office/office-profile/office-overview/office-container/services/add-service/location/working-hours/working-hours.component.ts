import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
 

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss']
})
export class WorkingHoursComponent implements OnInit {
  
  weekDays =  [
    {
        days: {
             id: "sunday",
             name: "S"
        },
        isSelected: false
    },
    {
        days: {
            id: "monday",
            name: "M"
       },
       isSelected: false
    },
    {
        days: {
            id: "tuesday",
            name: "T"
       },
       isSelected: false
    },
    {
        days: {
            id: "wednesday",
            name: "W"
       },
       isSelected: false
    },
    {
        days: {
            id: "thursday",
            name: "T"
       },
       isSelected: false
    },
    {
        days: {
            id: "friday",
            name: "F"
       },
       isSelected: false
    },
    
    {
        days: {
            id: "saturday",
            name: "S"
       },
       isSelected: false
    },

];
 
  fromCtrl: FormControl;
  toCtrl: FormControl;
  hasErrors: boolean = false;
  submited: boolean = false;

  @Input() edit: any ;

  @Input() id: number;

  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  @Input() set sumbitted( isSubmitted: boolean ) {
        this.submited = isSubmitted;
        this.checkErrors();
  };

  constructor() {
     this.fromCtrl = new FormControl('', Validators.required);
     this.toCtrl =  new FormControl('', Validators.required);
   };

  ngOnInit() {
      
    if( this.edit &&  this.edit['week_days'] && this.edit['week_days'].length > 0) {
           this.handleEdit( this.edit );
    }
    
    this.fromCtrl.valueChanges.subscribe( from => {
         if( from ) {
             console.log(from);
             
             this.result.emit({
                   hour: from['hour'],
                   minute: from['minute'],
                   _case: 'from'
             })
         }
    } );

    this.toCtrl.valueChanges.subscribe( to => {
        if( to ) {
           this.result.emit({
                hour:  to['hour'],
                minute: to['minute'],
                _case: 'to'
          })
        } 
    } );
  };
  
  getDays() {   

      this.result.emit({
            days: this.weekDays.filter( ( days ) => days.isSelected ).map( ({ days }) => days.id ),
            hasErrors: this.hasErrors,
            _case: 'days'
      });

      if( this.submited ) {
            this.checkErrors();
      }
  }

  checkErrors(): boolean {
        
        if( !this.submited ) return;
        for (let index = 0; index < this.weekDays.length; index++) {
            if( this.weekDays[index]['isSelected'] ) {
                   return  this.hasErrors = false;
            }
        }
        return this.hasErrors =  true;
     
  };


  handleEdit( edit: any ) {

    let  { hour_from, hour_to } = edit;
 
    const spillitedFrom:any[] = hour_from.split(':');
    const spilittedTo:any[] = hour_to.split(':');

       this.fromCtrl.patchValue({
            hour: +spillitedFrom[0],
            minute: +spillitedFrom[1]
       })
       this.toCtrl.patchValue({
            hour: +spilittedTo[0],
            minute: +spilittedTo[1]
       })

   
       edit['week_days'].map( day => {
            this.weekDays.map( (days, i) => {
                    if( day === days.days['id'] ) {
                        this.weekDays[i]['isSelected'] = true;
                    }
            } )
        } )
  }
 
}
