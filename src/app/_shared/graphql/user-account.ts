import { Injectable } from '@angular/core';

import gql from 'graphql-tag';


export class graphqlUserAccount {

    public static getUserAccount = gql`
    query getAccount{
        getAccount {
            status,
            firstname,
            lastname,
            patronymic,{
                patronymic
                permission{
                type
                }
            }
            middlename,{
                middlename
                permission{
                type
                }
            }
            nickname,{
                nickname
                permission{
                type
                }
            }
            birthday{
                ,birthday
                permission{
                type
                }
            }
            gender{
                gender
                permission{
                type
                }
            }
            email{
                id,
                email,
                primary,
                activated,
                permission{
                type
                }
            },
            phone{
                id,
                country_code,
                number,
                primary,
                activated,
                permission{
                type
                }
                country_iso,
            },
            my_address{
                id,
                name,
                firstname,
                lastname,
                apartment,
                street,
                zip,
                city {
                    id,city,subdivision
                }
                country_id,
                primary,
                name,
                firstname,
                lastname,
                apartment,
                street,
                zip,
                city{
                    id,city,subdivision 
                }
                country_id,
                primary
            },
            otherAddress{
                id,
                name,
                fisrtname,
                lastname,
                appartment,
                street,
                zip,
                city{
                    id,city,subdivision 
                }
                country_id
            }
            ui_language,
            privacy{
                find_by_email,
                find_by_phone,
                active_status,
                sharing_edits,
                profile_pictures,
                my_connections
            },
            editable
        } 
    }
   `;

   public static getUserNotifications = gql`
    query getAccount{
            getAccount {
                notifications{
                    connection_request,
                    accept_invitation,
                    new_followers,
                    new_chat_message,
                    birthdays,
                    endorsements,
                    email_updates,
                    job_changes_in_network,
                    import_contacts_joined,
                    job_recommendations
                }
            } 
        }`;

    public static getUserPrivacy = gql`
        query getAccount{
            getAccount {
                firstname,lastname,
                email{
                    primary,email
                }
                privacy{
                    find_by_email,
                    find_by_phone,
                    active_status,
                    sharing_edits,
                    profile_pictures,
                    my_connections
                }
                last_change_password
            } 
        }`;

    public static getProfile = gql`
        query getProfile($url:String!, $lang:String){
            getProfile(url: $url, lang:$lang){
                id
                avatar,firstname,lastname,date_of_registration
                experiences(first:1, after:""){
                    title, company
                }
            }
        }
    `;

    public static ChangePrivacy = gql`
        mutation ChangePrivacy($privacy: PrivacyEnum!, $permission: PermissionType!){
            ChangePrivacy(privacy: $privacy, permission: $permission){
                success
            }
        }
    `;

   
   public static changeFirstName = gql`
    mutation ChangeFirstName($name: String!){
        ChangeFirstName( name: $name ){
        success
        }
    }`;

    public static changeFatherName = gql`
    mutation ChangePatronymic($patronymic: PatronymicInput!){
        ChangePatronymic( patronymic: $patronymic ){
          success
        }
    }`;

    public static changeMiddleName = gql`
    mutation ChangeMiddlename($middlename: MiddlenameInput!){
        ChangeMiddlename( middlename: $middlename ){
          success
        }
    }`;

    public static changeLastName = gql`
    mutation ChangeLastName($lastname: String!){
        ChangeLastName( lastname: $lastname ){
          success
        }
    }`;

    public static changeNativeName = gql`
    mutation ChangeNativeName($name: NativeNameInput!){
        ChangeNativeName( name: $name ){
          success
        }
    }`;

    public static changeNickName = gql`
    mutation ChangeNickname($nickname: NicknameInput!){
        ChangeNickname( nickname: $nickname ){
          success
        }
    }`;

    public static changeBirthDate = gql`
    mutation ChangeBithday($birthday: BirthdayInput!){
        ChangeBithday( birthday: $birthday ){
          success
        }
    }`;

    public static changeGender = gql`
    mutation ChangeGender($gender: GenderInput!){
      ChangeGender( gender: $gender ){
        success
      }
    }
    `;

    public static addEmail = gql`
    mutation AddEmail($email: EmailInput!){
        AddEmail( email: $email ){
          id
          success
        }
    }
    `;

    public static changeEmail = gql`
    mutation ChangeEmail($changes: ChangingEmailInput!){
        ChangeEmail( changes: $changes){
            success
        }
    }
    `;

    public static deleteEmail = gql`
    mutation RemoveEmail($id: ID!){
        RemoveEmail( id: $id){
            success
        }
    }
    `;

    public static addPhone = gql`
    mutation AddPhone($phone:   PhoneInput!){
        AddPhone( phone: $phone){
          id
          success
        }
    }
    `;

    public static editPhone = gql`
    mutation ChangePhone($changes: ChangingPhoneInput!){
        ChangePhone( changes: $changes ){
            success
        }
    }
    `;

    public static deletePhone = gql`
    mutation RemovePhone($id :ID!){
        RemovePhone( id: $id){
            success
        }
    }
    `;

    public static addMyAddress = gql`
    mutation AddMyAddress($address:AddressInput!){
      AddMyAddress( address:$address){
          id
          success
      }
    }`;

    public static editMyAddress = gql`
    mutation ChangeMyAddress( $id: ID!, $address: ChangingMyAddressInput! ){
      ChangeMyAddress( id:$id , address:$address){
        success
      }
    }`;

    public static deleteMyAddress = gql`
    mutation RemoveMyAddress($id :ID!){
        RemoveMyAddress( id: $id){
            success
        }
    }
    `;

    public static changeNotification = gql`
    mutation ChangeNotification($notification: NotificationEnum!,$value: Boolean!){
        ChangeNotification( notification: $notification,value:$value ){
            success
        }
    }
    `;

    public static changeLanguage = gql`
       mutation ChangeUILanguage($language:ID!){
        ChangeUILanguage( language:$language){
          success
        }
    }`;

    public static changePassword = gql`
    mutation ChangePassword($old_password:String! $new_password: String!){
        ChangePassword( old_password: $old_password,new_password: $new_password){
            success
        }
    }`;

    public static checkPassword = gql`
        query checkPassword($password: String!){
            checkPassword(password: $password){
                success
            }
        }
    `;

    public static DeactivateUserAccount = gql`
        mutation DeactivateUserAccount($password: String!){
            DeactivateUserAccount(password: $password){
                success
            }
        }
    `;

    public static ChangeNotificationsSetting = gql`
        mutation ChangeNotificationsSetting($property:NotificationOptions! $value:Boolean!){
            ChangeNotificationsSetting(property:$property value:$value){
            id
            success
            }
        }  
    `;


    public static getNotificationSettings = gql`
        query getNotificationSettings{
            getNotificationSettings{
            new_endorsement
            new_follow
            new_connection
            approved_connection
            job_invitation
            recommendation_request
            new_recommendation
            }
        }
    `;
    public static twoFARespone = gql`
        mutation Init2FA{
            Init2FA{
               qr_code
               key
            }
        } 
    `
    public static Enable2FA = gql`
       mutation Enable2FA($code:String!){
          Enable2FA(code:$code){
              id
              success
          }
       }
    `
    public static Disable2FA = gql`
        mutation Disable2FA($code:String!){
            Disable2FA(code:$code){
                id
                success
            }
        }
    `
    public static getAccountSessions = gql`
        query  getAccount($first:Int!,$after:Int!){
           getAccount{
            sessions(first:$first,after:$after){
                id
                browser_version
                os
                os_version
                device_type
                browser
                last_activity_time
                current_session
                location{
                    id
                    city
                    country
                    subdivision
                }
              }
            }
        }  
    
    `
    public static signOutFromSession = gql`
       mutation SignOutSession($sessionID:String!){
          SignOutSession(sessionID:$sessionID){
                  id
                  success
          }
       }
    `
    public static makeEmailPrimary = gql`
       mutation ChangeEmail($changes:ChangingEmailInput!){
         ChangeEmail(changes:$changes){
                 id
                 success
          }
       }
    `
    public static LogoutAll = gql`
        mutation SignOutFromAll{
            SignOutFromAll{
                success
            }   
        }
    `
}
