import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { GroupsService } from 'src/app/groups/shared/services/groups.service';
import { FormControl } from '@angular/forms';
import { Observable, merge } from 'rxjs';
import { GlobalUserProService } from '../../services/global-user-pro.service';



 

@Component({
  selector: 'app-invite-members',
  templateUrl: './invite-members.component.html',
  styleUrls: ['./invite-members.component.scss']
})

export class InviteMembersComponent implements OnInit {

 
  // Emit search result
  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  @Input() hasCheckAll: boolean = true;

  users: any[] = [];
  searchControl: FormControl;
  isCompanyActive: boolean;
  companyId: ( string | undefined ) = undefined ;

  mutation: {
    userCompany: { mutation: string,  path: string},
    companyCompany: { mutation: string,  path: string }
  }  = {
     userCompany:    {
       mutation: 'getFriendships',
       path: 'friend_profile'
     },
     companyCompany: {
       mutation: 'getFollowingCompanies',
       path: 'company_profile'
     }
  };

  constructor(
    private groupService: GroupsService,
    private globalUserProService: GlobalUserProService
  ) {
      this.searchControl = new FormControl('');
   }

   
  

  ngOnInit() {

    this.isCompanyActive = this.globalUserProService.isCompanyActive();

    //Company id 
    if( this.isCompanyActive ) {
        this.companyId = this.globalUserProService.getComapnyId();  
        
        //Change mutation  if company is active

        this.mutation  = {
          userCompany:  {
            mutation: 'getFollowingsForCompany',
            path: 'user_profile'
          },
          companyCompany: {
            mutation: 'getFollowingCompaniesForCompany',
            path: 'company_profile'
          }
        }    
    }

    // Get All Users
      this.getAllUsers()
      .subscribe( ( users: any ) => this.parseData( users )  );
                      

 
          this.searchControl
          .valueChanges
          .pipe(
            debounceTime(100),
            distinctUntilChanged(),
            switchMap( val => {
                if( val.length < 3 ) return this.getAllUsers();
                else return this.searchUsers( val );
            })
          ).subscribe( (data: any ) =>  {
                if( data ) this.parseData( data );
            });
    
  }


  searchUsers( value: string ): Observable<any> {
    
    const company = this.mutation.companyCompany;
    const user = this.mutation.userCompany ;
    console.log(company,user);
    
   return  merge(

    this.groupService
      .getSearchResult( this.companyId,  value, user.mutation )
      .pipe(
          map( ({ data } ) =>  data[user.mutation].map( ( item ) => {
              return {
                   fullName: `${item[user.path]['firstname']}  ${item[user.path]['lastname']}`,
                   avatar:      item[user.path]['avatar'],
                   url:         item[user.path]['url'],
                   id :         item[user.path]['id'],
                   isCompany: false
              }
          }) )
      ),

      this.groupService
       .getSearchResult( this.companyId, value, company.mutation ).pipe(
          map( ({ data }) => data[company.mutation].map( ( item ) => {
                return {
                  fullName:  item[company.path]['name'],
                   avatar:   item[company.path]['avatar'],
                   url:      item[company.path]['url'],
                   id :      item[company.path]['id'],
                   isCompany: true
                }
          }) ),
       )
   )
  }

   
  parseData( users: any[] ) {
   this.users = users.map(
                  user =>  {
                    return {
                        ...user,
                        isSelected: false
                    }
                  }
                );      
  }

  selectAll( e: any ) {

     const selected: boolean = e.target.checked;
     this.users.map(
       (_ , i ) => this.users[i].isSelected = selected
     )

  }
  
  getAllUsers(): Observable<any> {
 
  const mutation  = this.mutation.userCompany.mutation;
  const path = this.mutation.userCompany.path;

  return    this.groupService
            .getSearchResult( this.companyId,  '', mutation )
            .pipe(
                map( ({ data } ) =>  data[mutation].map( ( item ) => {
                    return {
                        fullName: `${item[path]['firstname']}  ${item[path]['lastname']}`,
                        avatar:      item[path]['avatar'],
                        url:         item[path]['url'],
                        id :         item[path]['id'],
                        isCompany: false
                    }
                }) )
            )
  };

  sendInvate( ) {
    
     const selectedUsers = this.users.map( user => {
       if( user.isSelected  ) {
          return user;
       }
     }).filter( item => item );

     this.result.emit( selectedUsers );

     
  };

};
  