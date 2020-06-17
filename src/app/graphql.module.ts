import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { HttpClient, HttpClientModule } from '@angular/common/http';

 //const uri = 'http://192.168.1.13:8000/graphql'; // <-- add the URL of the GraphQL server here
const uri = `${location.protocol}//${location.host}/graphql`; // <-- add the URL of the GraphQL server here

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData:{
    __schema:{
      types:[]
    }
  }
});

// export function createApollo(httpLink: HttpLink) {
//   return { 
//     link: httpLink.create({uri}),
//     cache: new InMemoryCache({ fragmentMatcher }),
//   };
// }

function  getProtocol(): string{
  return location.protocol === 'http:' ? 'ws:' : 'wss:' ;
}


@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
  // providers: [
  //   {
  //     provide: APOLLO_OPTIONS,
  //     useFactory: createApollo,
  //     deps: [HttpLink],
  //   },
  // ],
})
export class GraphQLModule {

  constructor(
    private apollo:Apollo,
    private httpClient:HttpClient
  ) {

    const httpLink = new HttpLink(httpClient).create({
      uri
    });

    const ws = new WebSocketLink({
      uri:`${getProtocol()}/${location.host}/graphqlws`,
      options:{
        reconnect:true,
        reconnectionAttempts:5,
        timeout:2000,
        lazy:true
      },
  
    });

  
    const link = split(
      ({ query }) => {
        const { kind , operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && 
              operation === 'subscription';
      },
      ws,
      httpLink
    )

    try {
      apollo.create({
        link,
        cache: new InMemoryCache({ fragmentMatcher })
      })
    } catch (error) {
      console.log(error);
      
    }
  }

}
