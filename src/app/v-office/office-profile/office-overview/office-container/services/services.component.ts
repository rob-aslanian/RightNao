import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
 

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss', '../../../../_shared/style.scss']
})
export class ServicesComponent implements OnInit {
  

  officeId: string ;
  services: any[] = [];
  toggleBar: string = 'card';
  isMe: boolean = false;
 
  constructor(
     private activatedRoute: ActivatedRoute,
     private officeService: OfficeService
  ) { }

  ngOnInit() {
   
     this.officeId =  this.activatedRoute.parent.parent.snapshot.params['officeId'];
     
     const { type , id } = this.activatedRoute.parent.parent.snapshot.params;
     
     this.officeService
     .getVofficeServices( this.officeId, type !== 'user' ? id : undefined ).subscribe( data => this.services = data );

     this.officeService
     .isMe(   type !== 'user' ? id : undefined, this.officeId )
       .subscribe( (data) =>  this.isMe =  this.officeService.checkIsMe(data)   );
  };


  toggleView( type: string ) {
       this.toggleBar = type;  
  };

  deleteService( serviceId: string, index: number ) {
      this.officeService
          .removeVofficeService( serviceId ).subscribe( () => this.services.splice( index, 1 ) );
  }

  pauseService( serviceId: string , index: number ) {    
      this.officeService
          .changeVOfficeServiceStatus( this.officeId, serviceId, 'status_paused' ).subscribe( () => this.services[index]['is_Paused'] = true );
  }

  activateOrPublish( isDraft: boolean , serviceId: string, index: number  ) {
         const key = isDraft ? 'is_Draft' : 'is_Paused';
         this.officeService
            .changeVOfficeServiceStatus( this.officeId, serviceId, 'status_activate' )
             .subscribe(  () => this.services[index][key] = false );

  }
}
