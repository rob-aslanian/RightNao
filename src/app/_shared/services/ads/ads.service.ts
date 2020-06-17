import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IAdsBanner, IAdsCandidate, IAdsCompany, AdsPlacesType } from '../../models/ads';
import { graphqlAds } from '../../graphql/ads/ads';
import { Observable,zip, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalUserProService } from '../global-user-pro.service';
import { HttpClient } from '@angular/common/http';
import { AdvertFormatType, AdverCategoryType } from '../../models/ads/ads.type';
import { IAdsCampmaignInput, IAdsInput } from '../../models/ads/shared.interface';


const API_PATH = 'api/v1/uploading/';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(
    private apollo:Apollo,
    private globalService:GlobalUserProService,
    private http:HttpClient,
    private userProService: GlobalUserProService
  ) { }


  input:IAdsCampmaignInput = {
    company_id: this.isCompany ? this.companyId : undefined,
    start_date: '',
    name: '',
    type: 'banner',
    formats: [],
    locations: [],
    languages: [],
    currency: '',
    gender: 'both',
    impressions: 0,
    clicks: 0,
    forwarding: 0,
    referals: 0
  }

  inputContent:IAdsInput = {
    id: '',
    url: '',
    type: 'banner',
    name: ''
  }

  
  headerBtn:BehaviorSubject<any> = new BehaviorSubject<any>({ type: 'manager', format: ''})

  


  private get isCompany() : boolean {
    return this.globalService.isCompanyActive();
  }

  private get companyId() : string {
    return this.globalService.isCompanyActive() && this.globalService.getComapnyId();
  }

  private get userUrl() : string {
    return this.globalService.isAuthenticated() && this.globalService.getUserProfile()['url']
  }

  private get companyUrl() : string {

    return ( this.globalService.isAuthenticated() && this.globalService.isCompanyActive() ) &&
           this.globalService.getCompanyProfile()['url']
  }

  private get language() : string {
    return this.globalService.getLanguage();
  }

  private get location() : string {
    return this.globalService.location;
  }

  public GetAdvertExample(type:AdverCategoryType = "any") {
    return this.apollo.query({
      query:graphqlAds.GetAdvert,
      variables: {  type }
    })
    .pipe(map(({data}) => data['GetAdvert']))
  }


  public GetAdverts(formats:AdvertFormatType[] | AdvertFormatType  , amount:number , type:AdverCategoryType = "any"): Observable<any> {
    return this.apollo.query({
      fetchPolicy:"no-cache",
      query:graphqlAds.GetAdverts,
      variables: { formats , amount , type }
    })
    .pipe(map(({data}) => data['GetAdverts']))
  }

  public ClickOnAdvert(advert_id:string) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlAds.ClickOnAdvert,
      variables: { advert_id }
    })
  }

  


  public CreateAdvertCampaign(input:IAdsCampmaignInput) {
    return this.apollo.mutate({
      mutation:graphqlAds.CreateAdvertCampaign,
      variables:{input}
    })
  }

  public GetAdvertCampaigns(first: number, after: string) : Observable<any> {
    let company_id = this.isCompany ? this.companyId : undefined;
    return this.apollo.query({
      query:graphqlAds.GetAdvertCampaigns,
      variables: {
        company_id,
        pagination: {
          first,
          after
        },
      }
    })
    .pipe(map(({data}) => data['GetAdvertCampaigns']))

  }

  public CreateAdvertByCampaign(campaign_id, input) {
    return this.apollo.mutate({
      mutation:graphqlAds.CreateAdvertByCampaign,
      variables: {
        campaign_id,
        input
      }
    })
  }

  public GetAdvertsByCampaignID(campaign_id, first: number, after: string) : Observable<any> {
    let company_id = this.isCompany ? this.companyId : undefined;
    return this.apollo.query({
      query:graphqlAds.GetAdvertsByCampaignID,
      variables: {
        company_id,
        campaign_id,
        pagination: {
          first,
          after
        },
      }
    })
    .pipe(map(({data}) => data['GetAdvertsByCampaignID']))

  }

  pauseAdvertCampaign(campaign_id) {
    return this.apollo.mutate({
      mutation:graphqlAds.pauseAdvertCampaign,
      variables: { campaign_id }
    })
  }

  pauseAdvert(advert_id) {
    return this.apollo.mutate({
      mutation:graphqlAds.pauseAdvert,
      variables: { advert_id }
    })
  }

  removeAdvertCampaign(campaign_id) {
    return this.apollo.mutate({
      mutation:graphqlAds.removeAdvertCampaign,
      variables: { campaign_id }
    })
  }

  removeAdvert(campaign_id, advert_id) {
    return this.apollo.mutate({
      mutation: graphqlAds.removeAdvert,
      variables: {
        campaign_id,
        advert_id
      }
    })
  }

  activeAdvertCampaign(campaign_id) {
    return this.apollo.mutate({
      mutation: graphqlAds.activeAdvertCampaign,
      variables: { campaign_id }
    })
  }

  activeAdvert(advert_id) {
    return this.apollo.mutate({
      mutation: graphqlAds.activeAdvert,
      variables: { advert_id }
    })
  }




  /**
   * Create Banner advert 
   * 
   * @param input 
   */
  public CreateBannerAdvert(banner:IAdsBanner) : Observable<any> {
      let company_id = this.isCompany ? this.companyId : undefined;

      return this.apollo.mutate({
        mutation:graphqlAds.CreateAdvertBanner,
        variables:{ company_id , banner }
      })
  }

  /**
   * Create Banner draft advert
   * 
   * @param input 
   */
  public CreateBannerDraftAdvert(banner:IAdsBanner) : Observable<any> {
    let company_id = this.isCompany ? this.companyId : undefined;

    return this.apollo.mutate({
      mutation:graphqlAds.CreateAdvertBannerDraft,
      variables:{ company_id , banner }
    })
  }

  /**
   * Publish banner 
   * 
   * @param id 
   */
  public PublishAdvert(id:string) : Observable<any>{
    let company_id = this.isCompany ? this.companyId : undefined;
    return this.apollo.mutate({
      mutation:graphqlAds.PublishAdvert,
      variables:{ company_id , id }
    })
  }
  

  /**
   * Pause advert
   * 
   * @param id 
   */
  public PutAdvertOnPause(id:string) : Observable<any>{
    let company_id = this.isCompany ? this.companyId : undefined;

    return this.apollo.mutate({
      mutation:graphqlAds.PutAdvertOnPause,
      variables:{ company_id , id }
    })
  }

  /**
   * Remove advert 
   * 
   * @param id 
   */
  public RemoveAdvert(id:string) : Observable<any>{
    let company_id = this.isCompany ? this.companyId : undefined;

    return this.apollo.mutate({
      mutation:graphqlAds.RemoveAdvert,
      variables:{ company_id , id }
    })
  }

  /**
   * Get Advert
   * 
   * @param first 
   * @param after 
   */
  public getAdvert(first:string , after:string) : Observable<any> {
    let company_id = this.isCompany ? this.companyId : undefined;

    return this.apollo.watchQuery({
      fetchPolicy:'network-only',
      query:graphqlAds.GetMyAdvert,
      variables:{ company_id , first , after  }
    })
    .valueChanges
    .pipe(map(({data}) => data['GetMyAdvert']))
  }

  /**
   * Create Candidate 
   * 
   * @param candidate 
   */
  public CreateAdvertCandidate(candidate:IAdsCandidate) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlAds.CreateAdvertCandidate,
      variables:{ candidate }
    })
  }


  /**
   * Create job ads 
   * @param job 
   */
  public CreateAdvertJob(job:IAdsCompany) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlAds.CreateAdvertJob,
      variables:{
        company_id:this.companyId,
        job
      }
    })
  }


  /**
   * Get advert gallery 
   * 
   * @param first 
   * @param after 
   */
  public GetAdvertGallery(first:string , after:string) : Observable<any> {
    let company_id = this.isCompany ? this.companyId : undefined;

    return this.apollo.watchQuery({
      query:graphqlAds.GetAdvertGallery,
      variables:{ company_id , first , after }
    })
    .valueChanges
    .pipe(map(({data}) => data['GetAdvertGallery']))


  }

  /**
   * Get profile for candidate ads 
   */
  public getProfile() : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlAds.getProfile,
      variables:{
        url:this.userUrl,
        lang:this.language
      }
    })
    .valueChanges
    .pipe(map(({data}) => data['getProfile']))
  }

  /**
   * Get Company profile 
   */
  public getCompanyProfile() : Observable<any> {
    return this.apollo.watchQuery({
      query:graphqlAds.GetCompanyProfile,
      variables:{
        url:this.companyUrl,
        lang:this.language
      }
    })
    .valueChanges
    .pipe(map(({data}) => data['GetCompanyProfile']))
  }


  /**
   * Get Company amount 
   */
  public getCompanyAmount() : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlAds.searchCompanies,
    })
    .valueChanges
    .pipe(map(({data}) => data['searchCompanies']['amount_of_results'] ))
  }

  /**
   * Get user amount 
   */
  public getUserAmount() : Observable<any>{
    return this.apollo.query({
      query:graphqlAds.searchUsers
    })
    .pipe(map(({data}) => data['searchUsers']['amount_of_results'] ))
  }

  /**
   * Get all profile amount 
   */
  public getProfilesAmount() : Observable<any>{
    return zip(this.getCompanyAmount() , this.getUserAmount())
              .pipe(map(([user , company]) => user + company ))
  }


  /**
   * Create Content 
   * 
   * @param form 
   */
  public createContent(form:FormData) : Observable<any>{
    let url = this.isCompany ? `company/${this.companyId}/advert_gallery/` : /// Company 
                               'advert_gallery/';   /// User


      return this.http.post(API_PATH + url , form)
                 .pipe(map((data) => data['info'][0] ));
  }


  /**
   * Get Advert banner 
   * 
   * @param places 
   * @param amount 
   */
  public getAdvertBanner(format: AdvertFormatType , amount:number) : Observable<any>{
    let countryID = this.location;

    return this.apollo.watchQuery({
      query:graphqlAds.GetAdvertBanners,
      fetchPolicy:'network-only',
      variables:{ countryID , format , amount  }
    })
    .valueChanges
    .pipe(map(({data}) => data['GetAdvertBanners']))
  }

  /**
   * Get Advert candidate 
   * 
   * @param amount 
   */
  public getAdvertCandidate(amount:number, format: AdvertFormatType) : Observable<any>{
    let countryID = this.location;

    return this.apollo.watchQuery({
      query:graphqlAds.GetAdvertCandidates,
      variables:{ countryID , format, amount  }
    })
    .valueChanges
  }

  /**
   * Get Advert jobs 
   * 
   * @param amount 
   */
  public getAdvertJobs(amount:number) : Observable<any>{
    let countryID = this.location;
    
    return this.apollo.watchQuery({
      query:graphqlAds.GetAdvertJobs,
      variables:{ countryID ,  amount  }
    })
    .valueChanges
  }



}
