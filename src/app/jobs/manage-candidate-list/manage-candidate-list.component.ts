import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InviteToApplyComponent } from '../../_shared/components/jobs/invite-to-apply/invite-to-apply.component';
import { graphqlJobForCompany } from '../../_shared/graphql/jobs/job-for-companies';
import { Apollo } from 'apollo-angular';
import { GlobalUserProService } from '../../_shared/services/global-user-pro.service';

@Component({
  selector: 'app-manage-candidate-list',
  templateUrl: './manage-candidate-list.component.html',
  styleUrls: ['./manage-candidate-list.component.scss', '../../network/network.component.scss', '../candidate-list/candidate-list.component.scss']
})
export class ManageCandidateListComponent implements OnInit {
  @Input() candidates: any[];
  @Input() candidate_type: string;
  @Output() inviteToApplySuccessEvent = new EventEmitter<any>();
  @Output() candidateUnsavedEvent = new EventEmitter<any>();
  @Output() candidateUnskippedEvent = new EventEmitter<any>();

  selectedCandidate: any;
  languageDropdownVisible: boolean = false;
  candidateActionDropdownVisible: boolean = false;
  unSaveCandidateMutationSubscription: any;
  unSkipCandidateMutationSubscription: any;
  isRequestInProgress: boolean = false;

  constructor(private modalService: NgbModal, private apollo: Apollo, private globalUserProfileService: GlobalUserProService) { }

  ngOnInit() {
  }

  // Select Candidate
  onSelectCandidate(candidate) {
    if (this.selectedCandidate === candidate) {
      return;
    }

    this.selectedCandidate = candidate;
  }

  // Toggle Language Dropdown
  toggleLanguageDropdown(event: any) {
    this.languageDropdownVisible = !this.languageDropdownVisible;
    if (!event) {
      return;
    }

    event.preventDefault();
  }

  // Toggle Candidate Action Dropdown
  toggleCandidateActionDropdown(event: any) {
    this.candidateActionDropdownVisible = !this.candidateActionDropdownVisible;
    if (!event) {
      return;
    }

    event.preventDefault();
  }

  // Open Invite to apply
  openInviteToApplyModal(candidate, event: any) {
    this.onSelectCandidate(candidate);
    const modalRef = this.modalService.open(InviteToApplyComponent);
    let candidateObj = this.selectedCandidate;
    candidateObj.profile = candidateObj.user;
    modalRef.componentInstance.modalContent = candidateObj;
    modalRef.result.then((result) => {
      // Show success notification
      this.inviteToApplySuccessEvent.emit(candidateObj);
      console.log("modal closed");
    },
      (reason) => {
      }
    );

    if (!event) {
      return;
    }

    event.preventDefault();
  }

  // Unsave Candidate
  unSaveCandidate(candidate: any, event: any){
    this.onSelectCandidate(candidate);

    if (this.isRequestInProgress) {
      return;
    }

    if (this.unSaveCandidateMutationSubscription) {
      this.unSaveCandidateMutationSubscription.unsubscribe();
    }

    this.isRequestInProgress = true;
    // Send request to unsave candidate
    this.unSaveCandidateMutationSubscription = this.apollo.mutate({
      mutation: graphqlJobForCompany.unsaveCandidate,
      variables: {
        "companyId": this.globalUserProfileService.getCompanyProfile().id,
        "candidateId": candidate.user_id
      },
      awaitRefetchQueries: true
    }).subscribe((data: any) => {
      this.isRequestInProgress = false;
      this.candidateUnsavedEvent.emit();
    },
      (error: any) => {
        this.isRequestInProgress = false;
        console.log(error);
      }
    );

    if (!event) {
      return;
    }

    event.preventDefault();
  }

  // Unskip Candidate
  unSkipCandidate(candidate: any, event: any){
    this.onSelectCandidate(candidate);

    if (this.isRequestInProgress) {
      return;
    }

    if (this.unSkipCandidateMutationSubscription) {
      this.unSkipCandidateMutationSubscription.unsubscribe();
    }

    this.isRequestInProgress = true;
    // Send request to unskip candidate
    this.unSkipCandidateMutationSubscription = this.apollo.mutate({
      mutation: graphqlJobForCompany.unskipCandidate,
      variables: {
        "companyId": this.globalUserProfileService.getCompanyProfile().id,
        "candidateId": candidate.user_id
      },
      awaitRefetchQueries: true
    }).subscribe((data: any) => {
      this.isRequestInProgress = false;
      this.candidateUnskippedEvent.emit();
    },
      (error: any) => {
        this.isRequestInProgress = false;
        console.log(error);
      }
    );

    if (!event) {
      return;
    }

    event.preventDefault();
  }
}
