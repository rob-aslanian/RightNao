import gql from 'graphql-tag';

export class graphqlEstate {

 public static addEstate = gql`
    mutation AddRealEstate( $input: AddRealEstateInput! ) {
        AddRealEstate( input: $input ) {
            id
            success
       }
     }
 `;

};