# Hypercube

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod --max_old_space_size=8048` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Technologies we use:

SASS - Ng Bootstrap - GraphQl : Apollo Client

#Notes About Modules: 
so we have different module every module inject in app.module.ts, 

Messaging: by seperate developer
Jobs: by seperate developer
Network: by seperate developer
user: by seperate developer
company: by seperate developer

#Notes About Development:

  #configuration of GraphQl:
    from graphql.module.ts you can change uri from there
  
  #Landing Page:
    is a component not a module. and inject in app.module.ts 

  #Modals(Popups):

    in user profile, account, company profile, account, messaging: we use modals from Ng Bootstrap.
    in network part: we use different methodology for modals: developer make it by <ng-template> and custom class for the modal

  #Shared Module:
    all shared services, components, mutation & queries for graphql, sass styles shared between two modules like account_shared_style.scss for user account and company account 
    and custom pipes for filter some data in views

    #Authintication user :
      in one service and we inject on all modules to check if the user is login or not to continue view the secure components or not, and so on, store all user information in localstorage and inside cookie: url_id
      token and user id.

  #Switching between user and company:

  #Proxy:
    to run project when you change proxyconfig you need to run thorugh this command line: ng serve --proxy-config proxyconfig.json



#Messaging Module:
  This moduile's main module file is messaging.module.ts. 

  The entry level component for this module is messaging.component.ts.

  This components consist of message-list.component.ts and router outlet.

  message-list.component.ts consist of list of chat on the left hand side and clicking on list item will change the route.

  Router outlet will route to messaging-view.component.ts which shows the data for each conversation.

  messaging-view.component.ts contains the header, messagige-interface.component.ts and message-details.component.ts

  messagige-interface.component.ts holds the actual messages inside the conversation(middle section of screen)

  message-details.component.ts holds the details about the selected conversation(Right section of the screen)

  For each message, there is a dedicated route with conversation ID as route param. 

  #Shared Components. 
    1) chat-container: 
          This component holds the list of messages inside the selected conversation. 

    2) send-message-form: 
          This component is the main for to send any message. 

    3) group-avatar: 
          Component to show the group avatar made of images of the group members

    4) search-conversation: 
          Component which holds the controls for different criteria to search conversation.        

    5) search-n-select: 
          Component to search any user or company and select them to do any required operation

    #Modals Components

    All the modal components are located inside the modals component and are shared among other components

    #Pipes
    Pipe are location inside the shared folder.

    #graphQL
    The graphql component has all the files related to the graphql functionality used inside the messaging module

    All the mutations are defined inside the mutations.ts file and all the queries are defined inside queries.ts file. 

    mapping.service.ts file is used to map all the queries and mutations based on user and company. 

    #listeners.services.ts 
    This files is the shared service which is used by all the components. This consiste of shared variables,subscription and websocket variable.





