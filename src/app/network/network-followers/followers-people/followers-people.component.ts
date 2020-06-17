import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
import { FormControl } from '@angular/forms';
 
@Component({
  selector: 'app-followers-people',
  templateUrl: './followers-people.component.html',
  styleUrls: ['../../../_shared/css/modals_shared_styles.scss','./followers-people.component.scss' , '../../network.component.scss']
})
export class FollowersPeopleComponent implements OnInit {
  
  
    @ViewChild('checkbox', {static: false }) private checkbox: HTMLInputElement

    connectionsList:any[] = [];

    connListlength:number;

    isSelected:boolean = true;

    view: string = 'card';
    
    searchCtrl: FormControl;

    isSelectedConn: boolean = false;

    isLoaded:boolean = true;



  constructor(
     private networkService:NetworkUserService
  ) { 
     this.searchCtrl = new FormControl('');
  }


  ngOnInit() {
     // get All users
     this.mainQuery('')
      .subscribe( 
        (data) => {
          this.parsePeople(data);
          this.isLoaded = false;
        }, 
        (err) => { this.isLoaded = false },
        () => { this.isLoaded = false });
        

    // Search users
     this.searchCtrl
     .valueChanges
      .pipe(
          distinctUntilChanged(),
          debounceTime(200),
          tap(() => this.isLoaded = true ),
          switchMap( input => this.mainQuery( input ) )
      )
      .subscribe( (data) => {
          this.parsePeople(data);
          this.isLoaded = false;
        }, 
        (err) => { this.isLoaded = false },
        () => { this.isLoaded = false } )
                              
  };
  
  // Query
  mainQuery(query): Observable<any>{

       return  this.networkService
                            .getFollowers(query)
                            .pipe(map( 
                                  (data:any) => data.data.getFollowers
                            ));
  };

  parsePeople( data ) {
    const people =  data.map((item,ind)=>{
           return {
              ...item.user_profile,
              isSelected: false
           }
    });

    this.connectionsList = people;
  }


  changeView( type: string ): string {
        return this.view = type;
  }


  selectAll( e: any ) {
 
   
    const isChecked = e.target.checked;

      this.connectionsList.map(
        ( _ , i ) =>  this.connectionsList[i]['isSelected'] = isChecked
      )

    //toggle follow button on checkbox check
    this.isSelectedConn = isChecked;
  };


  followAll() {
    const selectedConnections: Observable<any>[] = this.connectionsList.map(
                                                          (user,i) => {
                                                              this.connectionsList[i]['isSelected'] = false;
                                                              if( user.isSelected && !user.follow ) {
                                                                  this.connectionsList[i]['follow'] = true;
                                                                  return this.networkService
                                                                  .followUser( user.id )
                                                              }
                                                          }
                                                        ).filter( user => user );
 
    selectedConnections.length > 0 ? 
                                    forkJoin( selectedConnections )
                                    .subscribe( data => console.log( data ) ) : null ;

    this.checkbox['nativeElement'].checked = false;
    this.toggleFollow();
    this.connectionsList.map(  (_ , i) => this.connectionsList[i]['isSelected'] = false );
  }

  checkUser(e: any, i: number) {
       this.connectionsList[i]['follow'] = e.target.checked;
       this.toggleFollow();
  };

  toggleFollow() {
        this.connectionsList.filter( user => user.isSelected ).length > 0 ? 
                                                                            this.isSelectedConn = true : 
                                                                            this.isSelectedConn = false; 
  };

}
