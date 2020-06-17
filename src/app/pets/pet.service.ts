import { Injectable } from '@angular/core';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { PetsGraphql } from './pets.grapql';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    private globalProfileService: GlobalUserProService,
    private apollo: Apollo
  ) { }

  get companyId(): ( string | undefined  ) {
       return this.globalProfileService
                  .isCompanyActive() ? this.globalProfileService.getComapnyId() : 
                  undefined;
  };

  get profileId() {
    return this.globalProfileService.getProfileId();
  }


  AddPetsPlants( input: any ): Observable<any> {
      return this.apollo.mutate({
            mutation: PetsGraphql.AddPetsPlants,
            variables: {
              company_id: this.companyId,
              input
            }
      })
  }

  EditPetsPlants( input: any ): Observable<any> {
      return this.apollo.mutate({
         mutation: PetsGraphql.EditPetsPlants,
         variables: {
            input
         }
      })
  }

  getPetByID( pet_id: string  ): Observable<any> {
      return this.apollo.query({
           query: PetsGraphql.GetPetByID,
           variables: {
             company_id:this.companyId,
             pet_id
           }
      }).pipe(
        map(({data}) => data['GetPetByID'])
      )
  }

  GetPetsPlantsAlertsByID(pet_id:string, pagination){
    return this.apollo.query({
      query:PetsGraphql.GetPetsPlantsAlertsByID,
      variables: {
        pet_id,
        pagination
      }
    })
    .pipe( map( ( {data} ) => data['GetPetsPlantsAlertsByID'] ) )
  }

  GetPetsPlantsOffersByID(pet_id:string, pagination){
    return this.apollo.query({
      query:PetsGraphql.GetPetsPlantsOffersByID,
      variables: {
        pet_id,
        pagination
      }
    })
    .pipe( map( ( {data} ) => data['GetPetsPlantsOffersByID'] ) )
  }

  GetSavedPetPlants(pagination){
    return this.apollo.query({
      query:PetsGraphql.GetSavedPetPlants,
      variables:{
        company_id:this.companyId,
        pagination
      }
    })
  }

  MakePetsPlantsUrgent(pet_id){
    return this.apollo.mutate({
      mutation:PetsGraphql.MakePetsPlantsUrgent,
      variables:{
        company_id: this.companyId,
        pet_id
      }
    })
  }

  ChangePetsPlantsStatus(pet_id, status){
    return this.apollo.mutate({
      mutation:PetsGraphql.ChangePetsPlantsStatus,
      variables:{
        company_id: this.companyId,
        pet_id,
        status
      }
    })
  }

  MakeOfferToPetsPlants(input){
    return this.apollo.mutate({
      mutation:PetsGraphql.MakeOfferToPetsPlants,
      variables:{
        company_id:this.companyId,
        input
      }
    })
  }

  SubscribeToPetsPlants(pet_id, owner_id){
    return this.apollo.mutate({
      mutation:PetsGraphql.SubscribeToPetsPlants,
      variables:{
        company_id:this.companyId,
        pet_id,
        owner_id
      }
    })
  }

  UnSubscribePetsPlants(pet_id){
    return this.apollo.mutate({
      mutation:PetsGraphql.UnSubscribePetsPlants,
      variables:{
        company_id:this.companyId,
        pet_id
      }
    })
  }

  RemovePetsPlants(pet_id){
    return this.apollo.mutate({
      mutation:PetsGraphql.RemovePetsPlants,
      variables:{
        company_id:this.companyId,
        pet_id
      }
    })
  }

  LikePetPlan(pet_id){
    return this.apollo.mutate({
      mutation:PetsGraphql.LikePetPlant,
      variables:{
        company_id:this.companyId,
        pet_id
      }
    }) 
  }

  UnLikePetPlant(pet_id){
    return this.apollo.mutate({
      mutation:PetsGraphql.UnLikePetPlant,
      variables:{
        company_id:this.companyId,
        pet_id
      }
    }) 
  }

  TogglePetsPlantsAlert(pet_id:string, is_active:boolean){
    return this.apollo.mutate({
      mutation:PetsGraphql.TogglePetsPlantsAlert,
      variables:{
        company_id:this.companyId,
        pet_id,
        is_active
      }
    })
  }

  TogglePetsPlantsOffers(pet_id:string, is_active:boolean){
    return this.apollo.mutate({
      mutation:PetsGraphql.TogglePetsPlantsOffers,
      variables:{
        company_id:this.companyId,
        pet_id,
        is_active
      }
    })
  }






  
  getPetType( pet_id: string  ): Observable<any> {
    return this.apollo.query({
         query: PetsGraphql.getPetByType,
         variables: {
           company_id:this.companyId,
           pet_id
         }
    }).pipe(
      map(({data}) => data['GetPetByID'])
    )
  };

  RemovePetFile( pet_id: string, file_id: string ) {
      return this.apollo.mutate({
        mutation: PetsGraphql.RemovePetFile,
        variables: {
          company_id: this.companyId,
          pet_id,
          file_id
        }
    })
  }

}
