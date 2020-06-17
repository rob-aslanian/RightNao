import { Component, OnInit } from '@angular/core';
import { status } from '../../../../Shared/models/estate-model';
import { EstateFormService } from '../../../Service/estate-form.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-status-home',
  templateUrl: './status-home.component.html',
  styleUrls: ['./status-home.component.scss']
})


export class StatusHomeComponent implements OnInit {

  statu = status;
  stats: FormControl;
  isSubmitted: boolean = false;

  constructor(
    private estateService: EstateFormService
  ) {
      this.stats = estateService.status;
   }

  ngOnInit() {
       this.estateService
           .sumbitted
           .subscribe( ( isSubmitted ) => this.isSubmitted = isSubmitted );
  }

}
