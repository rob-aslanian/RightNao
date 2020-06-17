import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InviteToApplyComponent } from '../../_shared/components/jobs/invite-to-apply/invite-to-apply.component';
import { Apollo } from 'apollo-angular';
import { graphqlJobForCompany } from '../../_shared/graphql/jobs/job-for-companies';
import { GlobalUserProService } from '../../_shared/services/global-user-pro.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss', '../../network/network.component.scss']
})
export class CandidateListComponent implements OnInit {
  @Input() candidates: any[];
  @Output() inviteToApplySuccessEvent = new EventEmitter<any>();
  @Output() listModifiedEvent = new EventEmitter<any>();
  @ViewChild('languagePopupContainer', { static: false }) languagePopupContainer;
  @ViewChild('candidateActionsPopupContainer', { static: false }) candidateActionsPopupContainer;

  selectedCandidate: any;
  languageDropdownVisible: boolean = false;
  candidateActionDropdownVisible: boolean = false;
  isExperienceSectionExpanded: boolean = false;
  isEducationSectionExpanded: boolean = false;
  isLanguageSectionExpanded: boolean = false;
  isRecommendationSectionExpanded: boolean = false;
  isSaveCandidateInProgress: boolean = false;
  isSkipCandidateInProgress: boolean = false;

  // Mutation Subscriptions
  saveCandidateSubscription: any;
  skipCandidateSubscription: any;

  constructor(private modalService: NgbModal, private apollo: Apollo, private globalUserProfileService: GlobalUserProService) { 
    document.addEventListener('click', this.ofClickHandler.bind(this));
  }

  ngOnInit() {
  }

  // Of click handler
  ofClickHandler(event: any) {
    if (!event || !event.path) {
      return;
    }
    if (this.languagePopupContainer && !event.path.includes(this.languagePopupContainer.nativeElement)) {
      this.languageDropdownVisible = false;
    }
    if (this.candidateActionsPopupContainer && !event.path.includes(this.candidateActionsPopupContainer.nativeElement)) {
      this.candidateActionDropdownVisible = false;
    }
  }

  // Select Candidate
  onSelectCandidate(candidate){
    if(this.selectedCandidate === candidate){
      return;
    }

    this.selectedCandidate = candidate;
  }

  // Toggle Language Dropdown
  toggleLanguageDropdown(event: any){
    this.languageDropdownVisible = !this.languageDropdownVisible;
    if(!event){
      return;
    }

    event.stopImmediatePropagation();
    return false;
  }

  // Toggle Candidate Action Dropdown
  toggleCandidateActionDropdown(event: any){
    this.candidateActionDropdownVisible = !this.candidateActionDropdownVisible;
    if(!event){
      return;
    }

    event.stopImmediatePropagation();
    return false;
  }

  // Toggle Experience Section
  toggleExperienceSection(event: any){
    this.isExperienceSectionExpanded = !this.isExperienceSectionExpanded;
    if(!event){
      return;
    }

    event.preventDefault();
  }

  // Toggle Education Section
  toggleEducationSection(event: any){
    this.isEducationSectionExpanded = !this.isEducationSectionExpanded;
    if(!event){
      return;
    }

    event.preventDefault();
  }

  // Toggle Language Section
  toggleLanguageSection(event: any){
    this.isLanguageSectionExpanded = !this.isLanguageSectionExpanded;
    if(!event){
      return;
    }

    event.preventDefault();
  }

  // Toggle Recommendation Section
  toggleRecommendationSection(event: any){
    this.isRecommendationSectionExpanded = !this.isRecommendationSectionExpanded;
    if(!event){
      return;
    }

    event.preventDefault();
  }

  // Open Invite to apply
  openInviteToApplyModal(event: any){
    const modalRef = this.modalService.open(InviteToApplyComponent);
    modalRef.componentInstance.modalContent = this.selectedCandidate;
    modalRef.result.then((result) => {
      // Show success notification
      this.inviteToApplySuccessEvent.emit(this.selectedCandidate);
      console.log("modal closed");
    },
    (reason) => {
      console.log("modal dismissied");
    }
  );

    if(!event){
      return;
    }

    event.preventDefault();
  }

  // Save Candidate
  saveCandidate(candidate: any, event: any){
    if (event) {
      event.stopImmediatePropagation();
    }

    if (this.isSaveCandidateInProgress) {
      return;
    }

    if(this.saveCandidateSubscription){
      this.saveCandidateSubscription.unsubscribe();
    }

    this.saveCandidateSubscription = this.apollo.mutate({
      mutation: graphqlJobForCompany.saveCandidate,
      variables: {
        "companyId": this.globalUserProfileService.getCompanyProfile().id,
        "candidateId": candidate.profile.id
      }
    }).subscribe((data: any) => {
      this.isSaveCandidateInProgress = false;
      console.log("candidate saved.");
      this.listModifiedEvent.emit();
    },
      (error: any) => {
        this.isSaveCandidateInProgress = false;
        console.log(error);
      }
    );
  }

  // Skip Candidate
  skipCandidate(candidate: any, event: any){
    if (event) {
      event.stopImmediatePropagation();
    }

    if (this.isSkipCandidateInProgress) {
      return;
    }

    if(this.skipCandidateSubscription){
      this.skipCandidateSubscription.unsubscribe();
    }

    this.skipCandidateSubscription = this.apollo.mutate({
      mutation: graphqlJobForCompany.skipCandidate,
      variables: {
        "companyId": this.globalUserProfileService.getCompanyProfile().id,
        "candidateId": candidate.profile.id
      }
    }).subscribe((data: any) => {
      this.isSkipCandidateInProgress = false;
      console.log("candidate skipped.");
      this.listModifiedEvent.emit();
    },
      (error: any) => {
        this.isSkipCandidateInProgress = false;
        console.log(error);
      }
    );
  }
}
