import { Component, OnInit } from '@angular/core';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
 

@Component({
  selector: 'app-office-sent-proposals',
  templateUrl: './office-sent-proposals.component.html',
  styleUrls: ['./office-sent-proposals.component.scss']
})
export class OfficeSentProposalsComponent implements OnInit {

  propsals: any = {};

  constructor(
    private officeService: OfficeService
  ) { }

  ngOnInit() {
         this.officeService
          .GetSendedProposals()
            .subscribe( data => this.propsals = data );
  }

   

}
