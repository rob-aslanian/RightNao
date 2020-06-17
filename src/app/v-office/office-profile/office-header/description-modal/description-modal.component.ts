import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Idescription } from 'src/app/_shared/models/service/v-office/v-office-model';

@Component({
  selector: 'app-description-modal',
  templateUrl: './description-modal.component.html',
  styleUrls: ['./description-modal.component.scss']
})
export class DescriptionModalComponent implements OnInit, OnDestroy {

   
  @Input() data: Idescription;
  @Output()  changeDescription: EventEmitter<string> = new EventEmitter<string>();

  desControl: FormControl;
  $destroy: Subject<any> = new Subject<any>();



  constructor(
       private officeService: OfficeService
  ) {
       this.desControl = new FormControl();      
   }

  ngOnInit() {
     this.desControl.setValue(this.data.description);
  }


  submit() {
      let value = this.desControl.value.trim();

      this.officeService.addDescription(
                              this.data.company_id,
                              value,
                              this.data.office_id
                          ).pipe(takeUntil(this.$destroy)).subscribe( () => this.changeDescription.emit( value ) )
  }

  ngOnDestroy(): void {
     this.$destroy.next();
     this.$destroy.complete();
  }
}
