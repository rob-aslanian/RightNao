import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

export class GrowNetwork {
    // Grow yout network companies
    public static getSuggestedCompanies = gql`
        query getSuggestedCompanies{
            getSuggestedCompanies{
                company{
                    id,name,url,avatar,industry,type,email,address,foundation_year
                },
                followers
            }
        }
    `;

    public static FollowCompany = gql`
        mutation FollowCompany($companyId:String!){
            FollowCompany(companyId:$companyId)
        }
    `;

    // grow your network people

    public static getFriendSuggestions = gql`
        query getFriendSuggestions{
            getFriendSuggestions{
                user{
                    id,url,avatar,first_name,last_name,gender,primary_email,primary_phone,
                    last_experience{
                        company,
                        position
                    }
                },
                following,followers
            }
        }
    `;
    public static SendFriendRequest = gql`
        mutation SendFriendRequest($userId:String!,$description:String){
            SendFriendRequest(userId:$userId,description:$description){
                id
            }
        }
    `;
}
