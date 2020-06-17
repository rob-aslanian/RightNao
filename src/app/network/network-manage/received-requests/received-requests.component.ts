import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-received-requests',
  templateUrl: './received-requests.component.html',
  styleUrls: ['./received-requests.component.scss']
})
export class ReceivedRequestsComponent implements OnInit, OnDestroy {
  recievedList: any[] = [];
  $destroy:Subject<any> = new Subject<any>();

  constructor( 

    private networkService:NetworkUserService
   ) { }

  ngOnInit() {

    this.networkService.getFriendRequests(false).pipe(
      map( ( { data } ) => data['getFriendRequests'])
    ).subscribe( data => {
      this.recievedList = data;
    });

  }

  acceptFriendRequest( id: string , idx: number): void  {

      this.networkService.approveFriendRequest( id )
      .pipe(takeUntil(this.$destroy))
      .subscribe( data => {
          this.recievedList.splice(idx,1) 
        });

  }

  ignoreFriendRequest( id: string, idx: number): void {


     this.networkService
     .ignoreFriendRequest(id)
     .pipe(takeUntil(this.$destroy))
      .subscribe( data => {
          this.recievedList.splice(idx,1) 
      });

    }
    
 ngOnDestroy(){
    
     this.$destroy.next();
     this.$destroy.complete();
 

 }
}
