import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'
import { ListenersService } from '../../services/listeners.service';

@Component({
  selector: 'app-search-n-select',
  templateUrl: './search-n-select.component.html',
  styleUrls: ['./search-n-select.component.scss']
})
export class SearchNSelectComponent implements OnInit {

  // The component to search and select any user/company so that they could be added to a conversation 

  private _selectedItems;
  @Input() 
      set selectedItems(data) {
         this._selectedItems = data;
      };

      get selectedItems(){
        return this._selectedItems
      }
  @Input() currentProfile:any[];

  searchText: string = '';
  searchResult = [];
  showResultBox: boolean = false;
  @ViewChild('searchUserInput', { static: true }) searchUserInput: ElementRef;

  constructor(
    private apollo: Apollo,
    private graphQLMappingService: MappingService,
    private elRef: ElementRef
  ) { }

  ngOnInit() {
    // console.log('searchs parent ', )
  }

  // Get all the friends of the user
  getFriendships() {
    let isBlank = !this.searchText || /^\s*$/.test(this.searchText);
    if (!isBlank && this.searchText.length >= 3) {
      let variables = {
        query: this.searchText,
      }
      this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

      this.apollo.query({
        query: this.graphQLMappingService.getFriendships,
        fetchPolicy: 'network-only',
        variables: variables,
      }).subscribe
        (({ data }) => {
          this.searchResult = data[Object.keys(data)[0]];
          this.getCompanies();
        }, (error) => {
          
        });
    } else {
      this.searchResult = [];
    }
  }

  // Get following companies of the user
  getCompanies() {
    let variables = {
      query: this.searchText,
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.query({
      query: this.graphQLMappingService.getFollowingCompanies,
      fetchPolicy: 'network-only',
      variables: variables,
    }).subscribe
      (({ data }) => {
        let companies = data[Object.keys(data)[0]];
        companies = companies.map(element => {
                        let json = {
                          friend: {
                            id: element.company.id,
                            url: element.company.url,
                            first_name: element.company.name,
                            last_name: '',
                            avatar: element.company.avatar,
                            is_company: true
                          }

                        }

                        return json;
                      });

        companies.length > 0 ? this.searchResult = companies : null;

      }, (error) => {
        
      });
  }

  removeSelectedItem(index) {
    setTimeout(()=>{this.selectedItems.splice(index, 1)},200);
  }

  onSelectItem(item) {
 
    
    item.name = item.first_name + ' ' + item.last_name;

    /// If current profile 
    if(this.currentProfile){
      let alreadyConverstation = this.currentProfile.filter(prf => prf.id === item.id);
      alreadyConverstation.length === 0 ? this.selectedItems.push(item) : null;
    }

    if(!this.currentProfile){
      this.selectedItems.push(item);
    }

    this.searchText = '';
    

    this.searchUserInput.nativeElement.focus();
    setTimeout(()=>{this.searchResult = [];},200)
  }

  hideSearchResultBox() {
    setTimeout(() => { this.showResultBox = false }, 200)
  }

  close() {
    // this.listenersService.triggerSearchUserFields(false);
  }

  get isParentForwardOverlay(){
    return this.elRef.nativeElement.parentElement.className === 'modalPhoto-drop-forward'
  }

  // ngOnDestroy(): void {
  //   this.listenService.newUsersMessage.complete();
  // }

}
