import { Component, OnInit } from '@angular/core';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { map } from 'rxjs/operators';
 
 

@Component({
  selector: 'app-my-business',
  templateUrl: './my-business.component.html',
  styleUrls: ['./my-business.component.scss']
})

export class MyBusinessComponent implements OnInit {

  companyId: ( string | undefined ) = '';

  userId: (string | undefined ) = '';

  offices: any[] = [];

  constructor(
    private officeService: OfficeService,
    private globalUserProService: GlobalUserProService,
  ) { }

  ngOnInit() {

     this.companyId = this.globalUserProService.isCompanyActive() ? 
                      this.globalUserProService.getComapnyId() : 
                      undefined; 
     this.userId =   !this.globalUserProService.isCompanyActive() ? 
                      this.globalUserProService.getUserProfile()['id'] : 
                      undefined; 



    this.officeService
    .getVoffices( this.companyId, this.userId ).pipe(
        map( ({ data }) => data['GetVOffice']['v_offices'] )
    ).subscribe( offices => this.offices = offices )
     
  }

  handleOutput( e: any ) {
     if( e._case === 'delete' ) {
         return this.officeService
         .removeOffice( e.id ).subscribe( () => this.offices = this.offices.filter( office => office.id !== e.id )  );
     } else if( e._case === 'deactivate' ) {
        const mutation =  e.isDeactivated ? this.officeService
                                            .isOutOffice( e.id, !e.isDeactivated, ''  ) :
                                            this.officeService
                                            .isOutOffice( e.id, !e.isDeactivated, ''  );
        
        mutation.subscribe( () => this.deactivateOrActivateOffice( e.id, e.isDeactivated ) )
                            
     }

  }

  
  deactivateOrActivateOffice( officeId: string, isDeactivated ) {
        this.offices.map( ( office, i ) => {
              if( office.id === officeId ) {
                    this.offices[i]['isOut'] = !isDeactivated;
              }
        } ) 
  }
  

}
