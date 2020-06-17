import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { JobBenefits } from 'src/app/jobs/models/postJobmodels';

@Component({
  selector: 'app-benefits-modal',
  templateUrl: './benefits-modal.component.html',
  styleUrls: ['./benefits-modal.component.scss']
})
export class BenefitsModalComponent implements OnInit {

  benefits = JobBenefits;

  @Input() existBenefits: any[];

  @Output() result:EventEmitter<any[]> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {

    if(this.existBenefits){
      this.patchData();
    }
  }

  patchData(){
    this.existBenefits.map(exBn => {
        this.benefits.map(bn => {
           if(bn.id === exBn.id) bn.is_selected = true;
        });
    })
  }

  submit(){
    let selectedBenefits = this.benefits.filter(bn => bn.is_selected);

    if(selectedBenefits) this.result.emit(selectedBenefits)
    
  }
  trackByFn =  (index) => index;

}
