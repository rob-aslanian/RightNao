import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-followers-companies',
  templateUrl: './followers-companies.component.html',
  styleUrls: ['../../../_shared/css/modals_shared_styles.scss','./followers-companies.component.scss']
})

export class FollowersCompaniesComponent implements OnInit {

  connectionsList:any[] = [];
  connListlength:number;
  view: string = 'card';
  searchCtrol: FormControl;
  isSelectedConn: boolean = false;
  isLoaded:boolean = true;

  @ViewChild('checkbox', {static: false}) private checkbox: HTMLInputElement;

  constructor(
    private networkService:NetworkUserService
  ) {
      this.searchCtrol = new FormControl('');
   }

   
  ngOnInit() {

    // Get All Companies
    this.mainQuery('')
      .subscribe(        (data) => {
        this.parseCompanies(data);
        this.isLoaded = false;
      }, 
      (err) => { this.isLoaded = false },
      () => { this.isLoaded = false })


    //Search Companies
    this.searchCtrol
     .valueChanges
      .pipe(
          distinctUntilChanged(),
          debounceTime(200),
          tap(() => this.isLoaded = true ),
          switchMap( input => this.mainQuery( input ) )
      ).subscribe(         (data) => {
        this.parseCompanies(data);
        this.isLoaded = false;
      }, 
      (err) => { this.isLoaded = false },
      () => { this.isLoaded = false } )


  }
  
  // Query
  mainQuery(query): Observable<any>{

  return  this.networkService
                          .getFollowerCompanies(query)
                              .pipe(map( 
                                 (data:any) => data.data.getFollowerCompanies 
                               ))

  }
 
  
   changeView( view: string ): string {
      return this.view = view;
   }

   checkAll(e: any) {
       const isChecked = e.target.checked;

       this.connectionsList.map(
          (_, i) =>  this.connectionsList[i]['isChecked'] = isChecked
       )
 
       
       this.isSelectedConn = isChecked;
     

   }

   parseCompanies( data: any ) {
 
    const companies = data.map(( item )=>{
                                return {
                                    ...item.company_profile, 
                                    isChecked: false
                                }
                          });

     this.connectionsList = companies;
   }


   checkUser(e: any, i: number) {
      const isChecked = e.target.checked;
      this.connectionsList[i]['isChecked'] = isChecked;   

      const isSelected = this.checkIsSelected();

      if( !isSelected)  {
            this.isSelectedConn = true;
       } else {
            this.isSelectedConn = false;
            this.checkbox['nativeElement']['checked'] = false;
       }

     
      
   };

   checkIsSelected(): boolean {
       return this.connectionsList.filter(  comp => comp.isChecked ).length > 0 ? false : true;
   }
  
   followAll() {

       const companiesFollow: Observable<any>[] = this.connectionsList.map(
        (comp,i) => {
             this.connectionsList[i]['isChecked'] = false;
            if( comp.isChecked && !comp.follow ) {
                this.connectionsList[i]['follow'] = true;
                return  this.networkService.followCompanyUser(comp.id)
            }
        }
      ).filter( comp => comp );

    this.checkbox['nativeElement']['checked'] = false;
    
    return  companiesFollow ?  forkJoin( companiesFollow ).subscribe(
                                        data => console.log( data  )
                                ) : [  ]
       
   }
   
}
