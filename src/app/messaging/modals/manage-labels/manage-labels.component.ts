import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'

@Component({
  selector: 'app-manage-labels',
  templateUrl: './manage-labels.component.html',
  styleUrls: ['./manage-labels.component.scss']
})
export class ManageLabelsComponent implements OnInit {

  @Output() closeModal = new EventEmitter();

  name: string = '';
  color: string = 'light-blue';
  selectedLabelImg = './assets/img/133.svg';

  labels = [];
  selectedLabel: any;

  constructor(
    private apollo: Apollo,
    private graphQLMappingService: MappingService
  ) { }

  ngOnInit() {
    this.getAllLabels()
  }

  getAllLabels() {

    let variables = {}
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.query({
      query: this.graphQLMappingService.GetAllLabels,
      variables: variables,
      fetchPolicy: 'network-only'
    }).subscribe
      (({ data }) => {
        this.labels = data[Object.keys(data)[0]]
      });
  }

  createLabel() {
    if (this.name !== '') {
      let variables = {
        name: this.name,
        color: this.color
      }
      this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

      this.apollo.mutate({
        mutation: this.graphQLMappingService.CreateLabel,
        variables: variables
      }).subscribe(({ data }) => {
        this.getAllLabels();
        this.name = ''
      }, (error) => {
        alert('there was an error sending the query' + error);
      });
    } else {
      alert('Please enter name of the label.')
    }
  }


  setColor(color, imgPath) {
    this.color = color;
    this.selectedLabelImg = imgPath;
  }

  deleteLabel(id) {
    let variables = {
      id: id
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.DeleteLabel,
      variables: variables
    }).subscribe(({ data }) => {
      this.getAllLabels();
    }, (error) => {
      alert('there was an error sending the query' + error);
    });
  }

  close() {
    this.closeModal.emit();
  }

  onLabelClick(label) {
    this.selectedLabel = label;
  }

  updateLabel(color, imgPath) {
    let variables = {
      id: this.selectedLabel.id,
      name: this.selectedLabel.name,
      color: color
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)


    this.apollo.mutate({
      mutation: this.graphQLMappingService.UpdateLabel,
      variables: variables
    }).subscribe(({ data }) => {
      this.getAllLabels();
      this.name = ''
    }, (error) => {
      alert('there was an error sending the query' + error);
    });
  }
}
