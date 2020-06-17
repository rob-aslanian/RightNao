import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// libs
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import AbrName from 'src/assets/data/en/countries';
import { graphqlShared } from './graphql/shared/base-data';

// queries
const searchInListOfAllCities = gql`
  query getListOfAllCities($find_city: String){
    getListOfAllCities(search_city:{
      find_city:$find_city
    })
    {
      id
      city
      country
      subdivision
    }
  }
`;

const getListOfCountryCodes = gql`
  query {
    getListOfCountryCodes {
      id
      country_code
      country
    
    }
  }
`;

const getListOfUiLanguages = gql`
  query {
    getListOfUiLanguages 
    }
`;

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private querySubscription: any;
  private countries = new Subject();
  private cities = new Subject();

  Languages= [];

  public static company_industries: {id: string, name: string}[] = [ // TO JSON
    {id: 'industry_information_technology', name: 'Information Technology'}
  ];
  public static company_subindustries: {id: string, name: string, parent_id: string}[] = [ // TO JSON
    {id: 'subindustry_web_development', name: 'Web Development', parent_id: 'information_technology'},
    {id: 'subindustry_it_management', name: 'IT Management', parent_id: 'information_technology'}
  ];

  constructor(private httpClient: HttpClient, private apollo: Apollo) {}



  get Countries(){
    this.getCountries();
    return this.countries;
  }


  public getListOfCountries() {
    return this.httpClient.get('/assets/data/en/territories.json')
      .pipe(
        map(data  => {
          const filtered: any[] = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              // if (key % 1 !== 0 && key.length === 2) {
              if (key.length === 2) {
                filtered.push({asc: key, name: data[key]});
              }
            }
          }
          return filtered;
        })
      );
  }

  public getListOfProducts() {
        return this.httpClient.get('/assets/data/en/products.json')
  }


  public getCountries(){
    this.getListOfCountries().subscribe((data) => {
      
      let countries = data;
        
      countries.map(country => {
        if(AbrName[country['name']]){
          country['name'] = AbrName[country['name']];
        }
        
      });

      countries.sort((a,b) => b['name'] < a['name'] ? 1 : -1);
      
      this.countries.next(countries)
    })
  }

  public getCities(country:string , city:string) : Observable<any>{
    
    return  this.apollo.watchQuery({
        query: graphqlShared.getListOfCities,
        fetchPolicy:'network-only',
        variables: {
          "search_city": {
            "country_id": country,
            "find_city": city
          }
        }
      }).valueChanges
  }

  public searchInListOfAllCities(find_city: string) {
  
    return this.apollo.watchQuery({
      query: searchInListOfAllCities,
      variables: {
        find_city
      }
    }).valueChanges;  
  }

  public getListOfCountryCodes() {
    return this.apollo.watchQuery({
      query: getListOfCountryCodes
    }).valueChanges;
  }

  public getListOfLanguages(find?:string){
    let toSortedArray = [];
    this.httpClient.get('./assets/data/en/languages.json').subscribe(data=>{
 
  
      let obj: any;
      let key: any;
      for ( key in data) {

          if (data.hasOwnProperty(key)) {

            if(key % 1 !== 0){

              obj = { item_id: key, item_text: data[key] };
              toSortedArray.push(obj);
            }
          }

          if(find) {
             this.Languages = toSortedArray.filter(l => l.item_text.toLowerCase().includes(find.toLowerCase()));
             
          }
      
          
          this.Languages =  toSortedArray.sort((a,b) => (a.item_text > b.item_text)?1:(b.item_text > a.item_text)?-1:0);
      }

    },
      (err: HttpErrorResponse) => {
        
      }
    );



    this.Languages = toSortedArray.sort((a,b) => (a.item_text > b.item_text)?1:(b.item_text > a.item_text)?-1:0);
    return this.Languages;

  }

  public getCompanies(name:string | string[]) : Observable<any>{
    
    return this.apollo.watchQuery({
      query:graphqlShared.SearchCompanies,
      variables:{ name }
    }).valueChanges
      .pipe(
        map(({data}) => data['searchCompanies'].company)
      )
  }

}
