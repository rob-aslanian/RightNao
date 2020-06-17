import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../../services.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';


@Component({
  selector: 'app-manage-services-proposals',
  templateUrl: './manage-services-proposals.component.html',
  styleUrls: ['./manage-services-proposals.component.scss']
})
export class ManageServicesProposalsComponent implements OnInit, OnDestroy {


  listOfProposals: any[] = []; 
  filteredPorposals: any[] = []; 
  listOfRequestTitles: any[] = []; 
  
  myUserID: string; 
  myCompnayID: string; 
  
  isFilterActive: boolean = false; 
  isOptionsActive: boolean = false; 

  filterTitle: string = 'Latest'


  constructor(

    private servicesService: ServicesService,
    private globalUserProService: GlobalUserProService, 

  ) { }

  ngOnInit() {

    this.getReceivedProposals(); 

    this.globalUserProService.isCompanyActive() ?  this.myCompnayID = this.globalUserProService.getCompanyProfile().id  : 
    this.myUserID = this.globalUserProService.getUserProfile().id; 
    
  }

  getReceivedProposals() {
    return this.servicesService
               .getReceivedProposals()
               .subscribe(data => {

                  let listOfProposals: any[] = []; 

                  listOfProposals = data['data']['GetReceivedProposals']['proposals'];         
                  
                  this.listOfRequestTitles = listOfProposals.map( item =>  item.request.title ); 
 
                  

                //  * * * * *  Get service Reviews * * * * 
                  listOfProposals.map( item => {
                
                     return this.servicesService
                                .getServicesReview(item.service.officeID)
                                .subscribe( data => {

                                  let reviews = data['data']['GetServicesReview']; 

                                  item.service.reviews = reviews; 
                                  const getTotalReviews = (accum, currValue) => accum.review_avg + currValue.review_avg; 
                                  
                                  if ( reviews.reviews.length > 0 ) {
                                    
                                    item.service.reviews.totalAverageOfReviews = Math.floor( reviews.reviews.reduce( getTotalReviews ) / reviews.reviews.length );  
                                    
                                  } else {
                                    item.service.reviews.totalAverageOfReviews = 0; 
                                  }; 
                                  
                                }, err => {
                                  console.log(err);
                                  
                                }); 
                  }); 

                  this.listOfProposals = listOfProposals; 
                  console.log(this.listOfProposals); 
              
                
              }, err => {
                console.log(err);
                
              });   
  }; 



  ignoreProposalForServiceRequest(index: number, proposal_id: string) {
    return this.servicesService.ignoreProposalForServiceRequest(proposal_id)
                               .subscribe(data => {
                                  console.log(data);
                                  this.listOfProposals.splice(index, 1);
                                  this.listOfRequestTitles.splice(index, 1); 

                                }, err => {
                                  console.log(err);
                                  
                                }) ;
  };

  orderProposalForServiceRequest( index: number, proposal_id: string ) {
    return this.servicesService
               .orderProposalForServiceRequest(proposal_id)
               .subscribe(data => {
                 console.log(data);
                 this.listOfProposals.splice(index, 1); 
                 this.listOfRequestTitles.splice(index, 1); 
                 
               }, err => {
                 console.log(err);

               }); 

  }; 

  filterProposalsByTitle(keyWord: any) {
    
    if ( keyWord === 'all' ) {
      this.isFilterActive = false; 
    } else  {
      this.filteredPorposals = this.listOfProposals.filter( proposal => {

        if ( proposal.request.title === keyWord ) {
  
          return  proposal; 
        };

      }); 

      this.isFilterActive = true; 
    }; 

  }; 

  customProposaFilter( options: string ) {   

    switch (options) {  

      case 'latest' :    
          this.filterTitle = 'Latest';
          this.isOptionsActive = false;
        break

      case 'oldest' :
          this.filterTitle = 'Oldest';        
          this.isOptionsActive = false;
          this.isFilterActive = false;
        break

      case 'low' :
          this.filterTitle = 'Price - Lowest First'; 
          this.isOptionsActive = false;

          if ( this.isFilterActive ) {
            const lowestPrice = this.filteredPorposals.sort( ( a, b ) =>  a.price_amount - b.price_amount ); 
            this.filteredPorposals = lowestPrice
          } else {
            const lowestPrice = this.listOfProposals.sort( ( a, b ) =>  a.price_amount - b.price_amount ); 
            this.listOfProposals = lowestPrice
          };
        break

      case 'high' :
          this.filterTitle = 'Price - Highest First'; 
          this.isOptionsActive = false;  
          
          if ( this.isFilterActive ) {
            const highestPrice = this.filteredPorposals.sort( ( a, b ) =>  b.price_amount - a.price_amount ); 
            this.filteredPorposals = highestPrice

          } else {
            const highestPrice = this.listOfProposals.sort( ( a, b ) =>  b.price_amount - a.price_amount ); 
            this.listOfProposals = highestPrice
          };  
        break

      case 'delivery' :
          this.filterTitle = 'Delivery Time'; 
          this.isOptionsActive = false;
        break;

      case 'raiting' :
          this.filterTitle = 'Raiting'; 
          this.isOptionsActive = false;

          if ( this.isFilterActive ) {
            const raiting = this.filteredPorposals.sort( ( a, b ) => b.service.reviews.totalAverageOfReviews -  a.service.reviews.totalAverageOfReviews )
            this.filteredPorposals = raiting;   

          } else {
              const raiting = this.listOfProposals.sort( ( a, b ) => b.service.reviews.totalAverageOfReviews -  a.service.reviews.totalAverageOfReviews )
              this.listOfProposals = raiting;  
          };
        break;
    
    }
  }

  toggleOptions() {
    this.isOptionsActive === false ? this.isOptionsActive = true : this.isOptionsActive = false; 
  }



  ngOnDestroy(): void {
    
    this.getReceivedProposals().unsubscribe(); 

  }; 

}
