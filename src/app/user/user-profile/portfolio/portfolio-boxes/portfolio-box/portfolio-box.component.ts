import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { ActivatedRoute } from '@angular/router';
import { supportedType } from '../../model.interface';
 

@Component({
  selector: 'app-portfolio-box',
  templateUrl: './portfolio-box.component.html',
  styleUrls: ['./portfolio-box.component.scss']
})

export class PortfolioBoxComponent implements OnInit {

  @Input() portfolio: any;

  @ViewChild( AppModalComponent , { static: true } ) _modal: AppModalComponent;

  modalType: string;

  selectedPortId: string;

  type: supportedType

 

  constructor(
     private activateRoute: ActivatedRoute,
  ) {  }

  ngOnInit() {
    this.type = this.activateRoute.snapshot.data['type']    
  }

  openPortfolio( portfolioId: string, modalTitle: string ) {

     this.selectedPortId = portfolioId;

     this.modalType = 'portfolioDetailed';

     this._modal.title = modalTitle;

     this._modal.open();      
  };

  getPortfolioModalResult() {
     this._modal.close();
     
  }
  
  ngOnDestroy(): void {
     this._modal.close();
  }
 
}
