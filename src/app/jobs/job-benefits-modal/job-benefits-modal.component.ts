import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobBenefits } from '../models/postJobmodels';

@Component({
  selector: 'app-job-benefits-modal',
  templateUrl: './job-benefits-modal.component.html',
  styleUrls: ['./job-benefits-modal.component.scss', '../../_shared/css/modals_shared_styles.scss']
})
export class JobBenefitsModalComponent implements OnInit {
  benefits = JobBenefits;

  @Input() existingBenefits: any;
  constructor(public activeModal: NgbActiveModal) { 
    
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Set existing benefits as selected
    if (!this.existingBenefits) {
      return;
    }

    this.existingBenefits.forEach(benefit => {
      var selectedBenefit = this.benefits.filter(bn => {
        return bn.name.toLowerCase() === benefit.toLowerCase();
      });
      if (selectedBenefit && selectedBenefit.length > 0) {
        selectedBenefit[0].is_selected = true;
      }
    });
  }

  // Close Modal
  close(event: any) {
    if (event) {
      event.preventDefault();
    }

    // dismiss modal
    this.activeModal.dismiss();
    return false;
  }

  // Get Selected Benefits
  getSelectedBenefits() {
    return this.benefits.filter(bn => {
      return bn.is_selected === true;
    });
  }

  // Submit 
  submit() {
    this.activeModal.close(this.getSelectedBenefits());
  }
}
