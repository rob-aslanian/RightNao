import { Injectable } from '@angular/core';

import gql from 'graphql-tag';

export class Manage {

    
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
