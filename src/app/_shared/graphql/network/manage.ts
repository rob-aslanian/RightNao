import { Injectable } from '@angular/core';

import gql from 'graphql-tag';

export class Manage {
    public static getFriendRequests = gql`
        query getFriendRequests( $status:String, $sent:Boolean ){
            getFriendRequests( status:$status, sent:$sent ){
                id
                my_request
                status
                description
                friend {
                    id
                    url
                    avatar
                    first_name
                    last_name
                    gender
                    primary_email
                    primary_phone
                last_experience{
                    company
                    position
                }
                }
                created_at
                responded_at
            }
        }
    `;
    
    public static getBlockedUsersOrCompanies = gql`
        query getBlockedUsersOrCompanies{
            getBlockedUsersOrCompanies{
                id
                name
                avatar
                is_company
            }
        }
    `;
    
    public static approveFriendRequest = gql`
        mutation ApproveFriendRequest( $requestId:String! ){
            ApproveFriendRequest( requestId:$requestId )
        }
    `;
    
    public static ignoreFriendRequest = gql`
        mutation IgnoreFriendRequest( $requestId:String! ){
            IgnoreFriendRequest( requestId:$requestId )
        }
    `;

    public static UnblockUser = gql`
        mutation UnblockUser( $userId:String! ){
            UnblockUser( userId:$userId )
        }
    `;

    public static UnblockCompany = gql`
        mutation UnblockCompany( $companyId:String! ){
            UnblockCompany( companyId:$userId )
        }
    `;

}
