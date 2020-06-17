import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { Observable, Subscription, Subject, merge } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Apollo } from 'apollo-angular';
import { CONSTANTS } from 'src/app/messaging/shared/constants';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { FilepathPipe } from 'src/app/messaging/shared/pipes/filepath.pipe'

import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageDetailsComponent implements OnInit {

  @Input() conversation: any;
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  formatMatches = (value: any) => value.name || '';

  formData: FormData;
  filePathPipe = new FilepathPipe();

  modalRef: any;
  user: any = null;
  company: any = null;
  labels: any[];
  typedLabel: any;
  files = [];
  searchText: string = '';
  showClearSearchBtn = false;
  toggleGroupRename: boolean = false;
  renameText: string = '';
  showMoreInfo = false;
  showMorePhotos = false;
  allLabelsLoaded = false;
  selectedPhotoIndex = 0;

  allLabelsSubscription: Subscription;
  allFilesSubscrioption: Subscription;
  userProfileSubscription: Subscription;
  toggleRenameSubscription: Subscription;

  utils = utilities;

  constructor(
    private ngbModalService: NgbModal,
    private cookieService: CookieService,
    private apollo: Apollo,
    private http: HttpClient,
    public listenersService: ListenersService,
    private graphQLMappingService: MappingService,
    private router: Router) { }

  ngOnInit() {
    this.appendListeners();
  }

  ngOnDestroy() {
    this.allLabelsSubscription.unsubscribe();
    this.userProfileSubscription && this.userProfileSubscription.unsubscribe();
    this.toggleRenameSubscription.unsubscribe()
  }

  // Function to append all the subscription
  appendListeners() {
    this.allLabelsSubscription = this.getAllLabels();
    this.toggleRenameSubscription = this.listenersService.toggleRenameGroupInput.subscribe((val) => {
      this.toggleGroupRename = val
    })

    if (this.conversation.is_group == false) {
      this.userProfileSubscription = this.getParticipant().is_company ? this.GetCompanyProfile() : this.getUserProfile()
    }
  }

  GetCompanyProfile() {
    return this.apollo.watchQuery({
      query: this.graphQLMappingService.getCompanyProfile,
      variables: {
        url: this.getParticipant().url
      },
    }).valueChanges.subscribe
      (({ data }) => {
        this.company = data[Object.keys(data)[0]]
      });
  }

  getParticipant() {
    let loggedInUserId = this.cookieService.get('user_id');
    let participant = this.conversation.participants.filter((item) => item.id !== loggedInUserId)[0];
    return participant
  }

  getAllLabels() {
    let variables = {}
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)
    return this.apollo.watchQuery({
      variables: variables,
      query: this.graphQLMappingService.GetAllLabels,
      fetchPolicy: 'network-only'
    }).valueChanges.subscribe
      (({ data }) => {
        let labels = data[Object.keys(data)[0]];
        this.conversation.labels = this.conversation.labels.filter((labelId) => {
          let isPresent = labels.find((label)=>label.id == labelId)
          return (isPresent == undefined ? false : true);
        })

        this.labels = data[Object.keys(data)[0]]
        this.allLabelsLoaded = true;
      });
  }

  getUserProfile() {
    let loggedInUserId = this.cookieService.get('user_id');
    let user = this.conversation.participants.filter((item) => item.id !== loggedInUserId)[0];
    let variables = {
      url: user.url
    }

    if (!this.conversation.is_group) {
      return this.apollo.watchQuery({
        query: this.graphQLMappingService.getUserProfile,
        variables: variables,
      }).valueChanges.subscribe
        (({ data }) => {
          this.user = data[Object.keys(data)[0]]
        });
    }
  }


  openManageLabelsModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-manage-labels-modal' })
  }

  openSharedPhotosModal(content, fileId) {
    this.selectedPhotoIndex = fileId ? this.listenersService.getConversationPhotos.findIndex((item) => item.fileUrl == fileId) : 0;
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-shared-photos-modal' })
  }

  getLabel(id) {
    return this.labels.filter((item) => {
      return item.id == id;
    })[0];
  }

  // Type ahead to search with label 
  searchLabel = (text$: Observable<string>) => {
    const debounceTime$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debounceTime$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.labels
        : this.labels.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)
      )
    )
  }

  onLabelSelect(selectedLabel) {
    let variables = {
      conversationId: this.conversation.id,
      labelId: selectedLabel.item.id
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)
    this.apollo.mutate({
      mutation: this.graphQLMappingService.AddLabelToConversation,
      variables: variables
    }).subscribe(({ data }) => {
      this.conversation.labels.push(selectedLabel.item.id)
      this.typedLabel = ''
    }, (error) => {
      this.typedLabel = ''
      alert('Error-101 ' + error)

    });
  }

  removeLabelFromConv(id) {
    let variables = {
      conversationId: this.conversation.id,
      labelId: id
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.RemoveLabelFromConversation,
      variables: variables
    }).subscribe(({ data }) => {
      let index = this.conversation.labels.indexOf(id);
      this.conversation.labels.splice(index, 1);
    }, (error) => {
      alert('Error-101 ' + error)
    });
  }

  renameGroup() {
    if (this.renameText !== '') {
      let variables = {
        conversationId: this.conversation.id,
        name: this.renameText
      }
      this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)
      this.apollo.mutate({
        mutation: this.graphQLMappingService.RenameConversation,
        variables: variables
      }).subscribe(({ data }) => {
        this.conversation.name = this.renameText;
        this.toggleGroupRename = false;
        this.listenersService.triggerGroupInfoUpdated({ // notify other components that group info is update 
          conversationId: this.conversation.id,
          groupAvatar: this.conversation.avatar,
          groupName: this.conversation.name
        })
      }, (error) => {
        alert('Error-101 ' + error)
      });
    } else {
      alert('Error-101 Please enter a name')
    }
  }

  downloadFile(fileId) {
    let filepath = this.filePathPipe.transform(fileId)
    window.open(filepath)
  }

  closeModal() {
    this.modalRef.close();
  }

  searchMessage() {
    this.listenersService.triggerSearchInsideInterface(this.searchText)
  }

  getMoreName() {
    let len = this.conversation.participants.length;
    if (len > 4) {
      let str = (len - 4) + 'more';
      return str;
    } else {
      return ''
    }
  }

  // Update group avatar
  fileChange(event) {
    this.formData = new FormData();
    let file = event.target.files[0];
    this.formData.append('file', file, file.name);

    let token = this.cookieService.get('token_user');
    this.http.post(CONSTANTS.FILEPATH + '?token=' + token, this.formData)
      .subscribe(
        res => {
          this.changeGroupAvatar(res['id'])
        },
        err => {
          alert('Oops! Failed to upload the file. Press CTRL+SHIFT+I to see the error in console.')
        }
      );
  }

  // Calling API Update group avatar
  changeGroupAvatar(fileId) {
    let variables = {
      conversationId: this.conversation.id,
      avatar: fileId
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)
    this.apollo.mutate({
      mutation: this.graphQLMappingService.ChangeConversationAvatar,
      variables: variables
    }).subscribe(({ data }) => {
      this.conversation.avatar = fileId;
      this.listenersService.triggerGroupInfoUpdated({
        conversationId: this.conversation.id,
        groupAvatar: fileId,
        groupName: this.conversation.name
      })

    }, (error) => {
      alert('Error-101 ' + error)
    });
  }

  // Open the participant chat when clicked from the list. 
  onParticipantClick(participantId) {
    let loggedInUserId = this.cookieService.get('user_id');
    if (loggedInUserId !== participantId) {
      let participantJSON = {
        id: participantId,
        is_company: false,
        is_admin: false
      }
      let params = {
        name: name,
        avatar: '',
        participants: [participantJSON]
      }
      this.createConversation(params, (conversationId) => {
        setTimeout(() => { this.router.navigate(['messaging/v/', conversationId]) }, 500)
      })
    }
  }

  // Create conversation when participant is click. 
  createConversation(params, callback) {
    this.graphQLMappingService.isCompany && (params['companyId'] = this.graphQLMappingService.companyId)
    this.apollo.mutate({
      mutation: this.graphQLMappingService.CreateConversation,
      variables: params
    }).subscribe(({ data }) => {
      let converstionId = data[Object.keys(data)[0]].id;
      callback(converstionId);
    }, (error) => {
      alert('Error-101' + error)
    });
  }

  getFileExt(file_name) {
    let dotIndex = file_name.lastIndexOf('.')
    let fileExt: string = file_name.substring(dotIndex);
    return fileExt.toLowerCase()
  }

  // Hidel label if there is no data
  showContactInfoLabel(user) {
    if (user) {
      if (user.email !== '' ||
        user.phone !== '' ||
        user.location.city ||
        user.location.country) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  downloadImage(fileUrl) {
    let filepath = this.filePathPipe.transform(fileUrl)
    window.open(filepath)
  }
}
