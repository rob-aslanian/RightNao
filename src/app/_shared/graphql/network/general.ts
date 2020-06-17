import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

export class General {
    public static getFriendships = gql`
        query getFriendships($query: String,$category: String,$letter: String,$sort_by: String,$companies:[String!]){
            getFriendships(query:$query,category:$category,letter:$letter,sort_by:$sort_by,companies:$companies){
                status
            }
        }
    `;

    public static getFollowings = gql`
        query getFollowings($query: String,$category: String,$letter: String,$sort_by: String,$companies:[String!]){
            getFollowings(query:$query,category:$category,letter:$letter,sort_by:$sort_by,companies:$companies){
                following
            }
        }
    `;
    
    public static getFollowingCompanies = gql`
        query getFollowingCompanies($query: String,$category: String,$letter: String,$sort_by: String){
            getFollowingCompanies(query:$query,category:$category,letter:$letter,sort_by:$sort_by){
                following
            }
        }
    `;

    public static getFollowers = gql`
        query getFollowers($query: String,$category: String,$letter: String,$sort_by: String,$companies:[String!]){
            getFollowers(query:$query,category:$category,letter:$letter,sort_by:$sort_by,companies:$companies){
                followers
            }
        }
    `;

    public static getFollowerCompanies = gql`
        query getFollowerCompanies($query: String,$category: String,$letter: String,$sort_by: String){
            getFollowerCompanies(query:$query,category:$category,letter:$letter,sort_by:$sort_by){
                followers
            }
        }
    `;

    public static getFriendRequests = gql`
        query getFriendRequests( $status:String, $sent:Boolean ){
            getFriendRequests( status:$status, sent:$sent ){
                id
            }
        }
    `;

}
