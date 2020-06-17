import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { General } from '../../_shared/graphql/network/general';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-network-general',
  templateUrl: './network-general.component.html',
  styleUrls: ['./network-general.component.scss'],
  host: {
    class: "netowrk-custom-col d-flex"
  }
})
export class NetworkGeneralComponent implements OnInit {

  connectionList:Observable<any>;
  followingPeople:Observable<any>;
  followingCompanies:Observable<any>;
  followersPeople:Observable<any>;
  followersCompanies:Observable<any>;
  manageReceivedRequest: Observable<any>;
  
  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit() {

    // gett Connection list
    this.connectionList = this.apollo.watchQuery({
      query: General.getFriendships,
      variables: {
        query: "",
        category: "",
        letter: "",
        sort_by: "",
        companies: []
      }
    }).valueChanges.pipe(
      map(
        (data:any) => data.data.getFriendships
        .filter(item => item.status == "Approved")
    ));

    // gett following people list
    this.followingPeople = this.apollo.watchQuery({
      query: General.getFollowings,
      variables: {
        query: "",
        category: "",
        letter: "",
        sort_by: "",
        companies: []
      }
    }).valueChanges.pipe(
      map(
        (data:any) => data.data.getFollowings
    ));

    // gett following Companies list
    this.followingCompanies = this.apollo.watchQuery({
      query: General.getFollowingCompanies,
      variables: {
        query: "",
        category: "",
        letter: "",
        sort_by: ""
      }
    }).valueChanges.pipe(
      map(
        (data:any) => data.data.getFollowingCompanies
    ));

    // gett Followers peope list
    this.followersPeople = this.apollo.watchQuery({
      query: General.getFollowers,
      variables: {
        query: "",
        category: "",
        letter: "",
        sort_by: "",
        companies: []
      }
    }).valueChanges.pipe(
      map(
        (data:any) => data.data.getFollowers
    ));

    // gett Followers Companies list
    this.followersCompanies = this.apollo.watchQuery({
      query: General.getFollowerCompanies,
      variables: {
        query: "",
        category: "",
        letter: "",
        sort_by: ""
      }
    }).valueChanges.pipe(
      map(
        (data:any) => data.data.getFollowerCompanies
    ));

    // gett manage received request list
    this.manageReceivedRequest = this.apollo.watchQuery({
      query: General.getFriendRequests,
      variables: {
        status: "Requested",
        sent: false
      }
    }).valueChanges.pipe(
      map(
        (data:any) => data.data.getFriendRequests
    ));


  }

}
