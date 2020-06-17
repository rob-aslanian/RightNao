import { Injectable } from '@angular/core';
import { SearchByType, SearchUserInput, SearchCompanyInput, SearchCandidateInput, SearchJobInput, SearchServiceRequestInput, SearchServiceInput, AdsListType, SearchRealEstateInput } from './models/search.model';
import { Apollo } from 'apollo-angular';
import { IPagination, ISearchCompany, ISearchJob, ISearchCandidate, ISearchUser, ISearchService, ISearchServiceRequest, ISearchRealEstateRequest } from './models/search.interface';
import { graphqlSearch } from '../_shared/graphql/search/search';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, EMPTY, zip, of } from 'rxjs';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  public searchCondition = new BehaviorSubject<ISearchUser | ISearchCompany | ISearchJob | ISearchCandidate>({});
  public fillterKeywords = new BehaviorSubject<any[]>([]);
  public searchForm      = new BehaviorSubject<FormGroup>(new FormGroup({}));
  public adsList         = new BehaviorSubject<any[]>([]);

  private searchType:SearchByType = 'people';
  private companyId:string;
  private viewType:string = 'card';
  private showFilter:boolean = false;

  private searchQuiries = {
    people:{
      query:'searchUsers',
      model: new SearchUserInput()
    },
    company:{
      query:'searchCompanies',
      model: new SearchCompanyInput(),
    },
    candidate:{
      query:'searchCandidate',
      model: new SearchCandidateInput(),
    },
    job:{
      query:'searchJobs',
      model:new SearchJobInput()
    },
    service:{
      query:'searchServices',
      model:new SearchServiceInput()
    },
    service_request:{
      query:'searchServiceRequests',
      model:new SearchServiceRequestInput()
    },
    real_estate:{
      query:'searchRealEstate',
      model:new SearchRealEstateInput()
    }
  }

  private saveFilterQuiries = {
    people:{
       user:"SaveUserSearchFilter",
       company:"SaveUserSearchFilterForCompany"
    },
    company:{
      user:"SaveCompanySearchFilter",
      company:"SaveCompanySearchFilterForCompany"
    },
    candidate:{
      company:'SaveCandidateSearchFilterForCompany',
    },
    job:{
      user:"SaveJobSearchFilter",
      company:"SaveJobSearchFilterForCompany"
    },
    service:{
      user:"SaveServiceSearchFilter",
      company:"SaveServiceSearchFilter"
    },
    service_request:{
      user:"SaveServiceRequestSearchFilter",
      company:"SaveServiceRequestSearchFilter"
    }
  }

  isCompanyActive:boolean;

  constructor(
    private apollo:Apollo,
    protected globalService:GlobalUserProService
  ) { 
    this.company_id = globalService.isCompanyActive() &&  globalService.getComapnyId();
    this.isCompanyActive = globalService.isCompanyActive();
  }

  set showLeft(value:boolean) {
    this.showFilter = value;
  }

  get showLeft() : boolean {
    return this.showFilter;
  }

  set type(value:SearchByType){
    this.searchType = value;
  }

  get type() : SearchByType{
    return this.searchType;
  }

  set view(value:string){
    this.viewType = value;
  }

  get view() : string {
    return this.viewType;
  }

  set company_id(value:string){
    this.companyId = value;
  }

  get company_id() : string {
    return this.companyId;
  }



  /**
   * Search service for all types 
   * 
   * @param pagination 
   * @param input 
   */
  public searchAll(pagination:IPagination , 
                  input?: ( ISearchUser |  ISearchCompany | ISearchCandidate | ISearchJob)) : Observable<any> {

       
      if(this.type === 'all') { return this.searchByAll(pagination , input)  }

      const query  = this.searchQuiries[this.type]['query'],
            model  = this.searchQuiries[this.type]['model'];
      
      if(input){
        let keys = Object.keys(model);

        keys.map(key => {
           if(!input[key]) { input[key] = model[key] }
        })
      }

      return this[query](input ? input : model  , pagination);
  }


  private searchByAll(pagination:IPagination , input:( ISearchUser |  ISearchCompany | ISearchCandidate | ISearchJob)) : Observable<any> {


  const  keywords = !!input ? input['keywords'] : [], 
          findCandidate = this.globalService.isCompanyActive() ? 
                          this.searchCandidate({...new SearchCandidateInput() , keywords} , pagination) : of({});

    return zip(this.searchUsers({...new SearchUserInput() , keywords} , pagination), 
               this.searchCompanies({...new SearchCompanyInput() , keywords} , pagination),
               this.searchJobs({...new SearchJobInput() , keywords} , pagination),
               this.searchServices({...new SearchServiceInput() , keywords} , pagination),
               this.searchServiceRequests({...new SearchServiceRequestInput() , keywords} , pagination),

               findCandidate
              )
  }


  /**
   * Save Filtter for all types
   * @param name 
   * @param filter 
   */
  public saveFillter(name:string , 
                    filter: ( ISearchUser |  ISearchCompany | ISearchCandidate | ISearchJob) ) : Observable<any> {
    const type = this.globalService.isCompanyActive() ? "company" : "user",
          query = this.saveFilterQuiries[this.type][type];

      if(query) {
        return this[query](name , filter);
      }

      return EMPTY;
  }

  /**
   * Get Fillters 
   */
  public getFillters() : Observable<ISearchUser[] | ISearchCompany[] | ISearchJob[] | ISearchCandidate[]>{
    return this.globalService.isCompanyActive() ?
           this.getAllFiltersForCompany() : this.getAllFilters();
  }


  /**
   * Remove filter 
   * 
   * @param filter_id 
   */
  public removeFilter(filter_id) : Observable<any> {
    return this.globalService.isCompanyActive() ?
           this.RemoveFilterForCompany(filter_id) : this.RemoveFilterForUser(filter_id);
  }


  /**
   * Search users 
   * 
   * @param input 
   * @param pagination 
   */
  public searchUsers(input:ISearchUser , pagination:IPagination) : Observable<any> {
    return this.apollo.query({
      fetchPolicy:'network-only',
      query:graphqlSearch.searchUsers,
      variables:{ input , pagination }
    })
    .pipe(map(({data}) => data['searchUsers']))
  }

  /**
   * Save user filter ----> for user 
   * 
   * @param name 
   * @param filter 
   */
  public SaveUserSearchFilter(name:string , filter: ISearchUser) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlSearch.SaveUserSearchFilter,
      variables:{ user_filter:{
         name,
         filter
       } }
    })
    .pipe(map(({data}) => data['SaveUserSearchFilter']))
  }

  /**
   * Save user filter ----> for company 
   * 
   * @param name
   * @param filter 
   */
  public SaveUserSearchFilterForCompany(name:string , userSearchFilter: ISearchUser) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlSearch.SaveUserSearchFilterForCompany,
      variables:{ user_filter:{
        companyID:this.globalService.getComapnyId(),
        name,
        userSearchFilter
      }}
    })
    .pipe(map(({data}) => data['SaveUserSearchFilterForCompany']))
  }


  /**
   * Search companies 
   * 
   * @param input 
   * @param pagination 
   */
  public searchCompanies(input:ISearchCompany , pagination:IPagination) : Observable<any> {

    return this.apollo.query({
      fetchPolicy:'no-cache',
      query:graphqlSearch.searchCompanies,
      variables:{ input , pagination }
    })
    .pipe(map(({data}) => data['searchCompanies']))
  }

   /**
   * Save company filter ----> for user 
   * 
   * @param name
   * @param filter 
   */
  public SaveCompanySearchFilter(name:string , filter : ISearchCompany) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlSearch.SaveCompanySearchFilter,
      variables:{ company_filter:{
        name,
        filter
      }}
    })
    .pipe(map(({data}) => data['SaveCompanySearchFilter']))
  }

   /**
   * Save company filter ----> for company 
   * 
   * @param name
   * @param filter 
   */
  public SaveCompanySearchFilterForCompany(name:string , companySearchFilter : ISearchCompany) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlSearch.SaveCompanySearchFilterForCompany,
      variables:{ company_filter:{
        companyID:this.globalService.getComapnyId(),
        name,
        companySearchFilter
      }}
    })
    .pipe(map(({data}) => data['SaveCompanySearchFilterForCompany']))
  }

  /**
   * Search jobs 
   * 
   * @param input 
   * @param pagination 
   */
  public searchJobs(input:ISearchJob , pagination:IPagination) : Observable<any> {
    return this.apollo.query({
      fetchPolicy:'no-cache',
      query:graphqlSearch.searchJobs,
      variables:{ input , pagination }
    })
    .pipe(map(({data}) => data['searchJobs']))
  }

  /**
   * Save job filter ----> for user 
   * 
   * @param name
   * @param filter 
   */
  public SaveJobSearchFilter(name:string ,  filter: ISearchJob) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlSearch.SaveJobSearchFilter,
      variables:{ job_filter:{
        name,
        filter
      }}
    })
    .pipe(map(({data}) => data['SaveJobSearchFilter']))
  }


  /**
   * Save job filter ----> for company 
   * 
   * @param name
   * @param filter 
   */
  public SaveJobSearchFilterForCompany(name:string ,  jobSearchFilter: ISearchJob) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlSearch.SaveJobSearchFilterForCompany,
      variables:{ job_filter:{
        companyID:this.globalService.getComapnyId(),
        name,
        jobSearchFilter
      }}
    })
    .pipe(map(({data}) => data['SaveJobSearchFilterForCompany']))
  }


  /**
   * Search Candidate 
   * 
   * @param input 
   * @param pagination 
   */
  public searchCandidate(input:ISearchCandidate , pagination:IPagination) : Observable<any> {
    return this.apollo.query({
      fetchPolicy:'network-only',
      query:graphqlSearch.searchCandidate,
      variables:{ input , pagination , company_id:this.globalService.getComapnyId() }
    })
    .pipe(map(({data}) => data['searchCandidate']))
  }

  /**
   * Save filter for candidate 
   * 
   * @param name 
   * @param filter 
   */
  public SaveCandidateSearchFilter(name:string , filter:ISearchCandidate) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlSearch.SaveCandidateSearchFilter,
      variables:{ name , filter , companyId:this.globalService.getComapnyId() }
    })
    .pipe(map(({data}) => data['SaveCandidateSearchFilter']))
  }

  /**
   * Save filter for candidate ---> for company
   * @param name 
   * @param candidateSearchFilter 
   */
  public SaveCandidateSearchFilterForCompany(name:string , candidateSearchFilter:ISearchCandidate) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlSearch.SaveCandidateSearchFilter,
      variables:{ candidate_filter:{
        name , 
        companyId:this.globalService.getComapnyId(),
        candidateSearchFilter
      }}
    })
    .pipe(map(({data}) => data['SaveCandidateSearchFilter']))
  }


   /**
    * Search service 
    * 
    * @param input 
    * @param pagination 
    */
   public searchServices(input:ISearchService, pagination:IPagination) : Observable<any> {
      return this.apollo.query({
        fetchPolicy:'no-cache',
        query:graphqlSearch.searchServices,
        variables:{ input, pagination }
      })
      .pipe(map(({data}) => data['searchServices']))
    }


   /**
    * Save service search filter --> for user and company 
    * 
    * @param name 
    * @param serviceSearchFilter 
    */
   public SaveServiceSearchFilter(name:string , serviceSearchFilter:ISearchService) : Observable<any> {
     return this.apollo.mutate({
       mutation:graphqlSearch.SaveServiceSearchFilter,
       variables:{
          companyId:this.globalService.getComapnyId(),
          service_filter:{
            name,
            ...serviceSearchFilter
          }
       }
     })
     .pipe(map(({data}) => data['SaveServiceSearchFilter']))
   }

   /**
    * Save service request search filter --> for user and company 
    * 
    * @param name 
    * @param serviceRequestSearchFilter 
    */
   public SaveServiceRequestSearchFilter(name:string , serviceRequestSearchFilter:ISearchServiceRequest) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlSearch.SaveServiceRequestSearchFilter,
        variables:{
          companyId:this.globalService.getComapnyId(),
          service_request_filter:{
            name,
            ...serviceRequestSearchFilter
          }
        }
      })
      .pipe(map(({data}) => data['SaveServiceRequestSearchFilter']))
    }


    /**
    * Search service request
    * 
    * @param input 
    * @param pagination 
    */
    public searchServiceRequests(input:ISearchServiceRequest, pagination:IPagination) : Observable<any> {
      return this.apollo.query({
        fetchPolicy:'no-cache',
        query:graphqlSearch.searchServiceRequests,
        variables:{ input, pagination }
      })
      .pipe(map(({data}) => data['searchServiceRequests']))
    }

    /**
     * Search Real Estate 
     * 
     * @param input 
     * @param pagination 
     */
    public searchRealEstate(input:ISearchRealEstateRequest, pagination:IPagination) : Observable<any> {
      return this.apollo.query({
        fetchPolicy:'no-cache',
        query:graphqlSearch.searchRealEstate,
        variables:{ 
          company_id:this.globalService.getComapnyId() || undefined,
          input, 
          pagination
         }
      })
      .pipe(map(({data}) => data['searchRealEstate']))
    }

        /**
     * Search petPlant
     * 
     * @param input 
     * @param pagination 
     */
    public searchPetPlant(pagination, input) {
      return this.apollo.query({
        fetchPolicy: 'no-cache',
        query:graphqlSearch.searchPetPlant,
        variables:{
          company_id:this.globalService.getComapnyId() || undefined,
          input,
          pagination
        }
      })
      .pipe ( map (   data   => data['data']['searchPetPlant'] ) )
    }


  /**
   * Get all fillters ------> for user 
   */
  public getAllFilters() : Observable<ISearchUser[] | ISearchCompany[] | ISearchJob[]> {
    return this.apollo.query({
       fetchPolicy:'network-only',
       query:graphqlSearch.getAllFilters,
    })
    .pipe(map(({data}) => data['getAllFilters']))

  }

  /**
   * Get all fillters ------> for company 
   */
  public getAllFiltersForCompany()  : Observable<ISearchUser[] | ISearchCompany[] | ISearchJob[] | ISearchCandidate[]> {
    return this.apollo.query({
       fetchPolicy:'network-only',
       query:graphqlSearch.getAllFiltersForCompany,
       variables:{ company_id:this.globalService.getComapnyId() }
    })
    .pipe(map(({data}) => data['getAllFiltersForCompany']))

  }

  /**
   * Remove filter ------> for user 
   * 
   * @param filter_id 
   */
  public RemoveFilterForUser(filter_id:string) : Observable<any> {
     return this.apollo.mutate({
       mutation:graphqlSearch.RemoveFilter,
       variables:{ filter_id }
     })
  }


  /**
   * Remove filter ------> for compnay 
   * 
   * @param filter_id 
   */
  public RemoveFilterForCompany(filter_id:string) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlSearch.RemoveFilterForCompany,
      variables:{ filter_id, companyID:this.globalService.getComapnyId() }
    })
 }



}
