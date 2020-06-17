import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators'
import { Observable, Subscription, Subject, merge } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { CookieService } from 'ngx-cookie-service';

import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'

@Component({
  selector: 'app-search-conversation-box',
  templateUrl: './search-conversation-box.component.html',
  styleUrls: ['./search-conversation-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchConversationBoxComponent implements OnInit {

  //Component to provide the set of contorls to search a conversation based on different criteria like labels, users, company, text etc

  @Output() getConversationList = new EventEmitter

  @ViewChild('instance', { static: false }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  selectedLabelId = '';
  conSearchText: string = '';
  allChatLabel: any[];
  label: any;
  formatMatches = (value: any) => value.name || '';

  allLabelsSubscription: Subscription;

  constructor(
    private ngbModalService: NgbModal,
    private apollo: Apollo,
    private cookieService: CookieService,
    private listenersService: ListenersService,
    private graphQLMappingService: MappingService
  ) { }

  ngOnInit() {
    this.allLabelsSubscription = this.getAllLabels();
  }

  ngOnDestroy() {
    this.allLabelsSubscription.unsubscribe();
  }

  // Get all the labels created by the user
  getAllLabels() {
    let variables = {}
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)


    return this.apollo.watchQuery({
      query: this.graphQLMappingService.GetAllLabels,
      fetchPolicy: 'network-only',
      variables: variables
    }).valueChanges.subscribe
      (({ data }) => {
        this.allChatLabel = data[Object.keys(data)[0]]
      });
  }

  // Bootstrap typeahead label dropdown
  search = (text$: Observable<string>) => {
    const debounceTime$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debounceTime$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.allChatLabel
        : this.allChatLabel.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)
      )
    )
  }

  onLabelSelect(selectedLabel) {
    this.selectedLabelId = selectedLabel.item.id;
    this.getConversationList.emit({
      labelId: this.selectedLabelId,
      text: this.conSearchText
    })
  }

  // Text search on key up
  onKeyUp() {
    this.getConversationList.emit({
      labelId: this.selectedLabelId,
      text: this.conSearchText
    })
  }

  onClearSearch() {
    this.selectedLabelId = '';
    this.label = '';
    this.getConversationList.emit({
      labelId: this.selectedLabelId,
      text: this.conSearchText
    })
  }

}
