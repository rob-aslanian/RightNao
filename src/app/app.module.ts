import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// libs
import { GraphQLModule } from './graphql.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

// modules
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { MessagingModule } from './messaging/messaging.module';
import { SharedModule } from './_shared/shared.module';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppComponent } from './app.component';
import { DemoNetworkComponent } from './landing-page/demo-network/demo-network.component';
import { DemoMessagingComponent } from './landing-page/demo-messaging/demo-messaging.component';
import { DemoJobsUserComponent } from './landing-page/demo-jobs-user/demo-jobs-user.component';
import { DemoJobsCompanyComponent } from './landing-page/demo-jobs-company/demo-jobs-company.component';
import { DemoAdsComponent } from './landing-page/demo-ads/demo-ads.component';
import { DemoDonateComponent } from './landing-page/demo-donate/demo-donate.component';
import { HelpCenterModule } from './help-center/help-center.module';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ErrorComponent } from './_shared/components/error/error.component';
import { NotificationsModule } from './notifications/notifications.module';
import { ShareModule } from '@ngx-share/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ContactComponent } from './landing-page/contact/contact.component';
import { CustromPreloadStrategyService } from './custrom-preload-strategy.service';
import { environment } from 'src/environments/environment';
import { CommingSoonComponent } from './_shared/components/comming-soon/comming-soon.component';
import { LandingCardComponent } from './landing-page/landing-card/landing-card.component';
import { ClassifiedAdsModule } from './_shared/shared/classified-ads/classified-ads.module';

const IS_PRODCUTION = environment.production;

export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http , './assets/i18n/' , '.json');
}


const appRoutes: Routes = [

  /// Registration 
  {
    path:'registration',
    loadChildren:"./registration/registration.module#RegistrationModule",
    data:{
      preload:true,
      delay:0
    }
  },

  /// Search
  { 
    path:'search' , 
    loadChildren:'./search/search.module#SearchModule',
    data: { 
      preload:true,
      delay:5000
    }   
  },
  /// User and company
  { 
    path:'user' , 
    loadChildren:'./user/user.module#UserModule',
    data: { 
      preload:false,
      delay:4000
     } 
  },
  //  Profile Landing page  
  {
    path:'landing',
    loadChildren:"./profile-landing-page/landing-page-module.module#LandingPageModule",
    data: {
      preload:true,
      delay:0
    }
  },
  {
    path:'wallet',
    loadChildren:"./wallet/wallet.module#WalletModule",
    data: {
      preload:true,
      delay:0
    }
  },
  // Company 
  { 
    path:'company', 
    loadChildren: './company/company.module#CompanyModule',
    data: { 
      preload:false,
      delay:5000 
    }  
  },
  /// Network 
  { 
    path:'network' , 
    loadChildren:'./network/network.module#NetworkModule',
    data: { 
      preload:true,
      delay:0,
    }   
  },
  // Network Company
  { 
    path:'network-company' , 
    loadChildren:'./network-company/network-company.module#NetworkCompanyModule',
    data: { 
      preload:false, 
      delay:7000,
    }   
  },
  /// V-Office
  { 
    path:'v-office' , 
    loadChildren:'./v-office/v-office.module#VOfficeModule',
    data: { 
      preload:true, 
      delay:0
    }   
  },
   // Real - Estate 
   { 
    path:'real-estate' , 
    loadChildren:'./real-estate/real-estate.module#RealEstateModule',
    data: { 
      preload:true, 
      delay:0
    }   
  },
  // Pets
  { 
    path:'pets' , 
    loadChildren:'./pets/pets.module#PetsModule',
    data: { 
      preload:true, 
      delay:0
    }   
  },
  // Groups
   { 
    path:'groups' , 
    loadChildren:'./groups/groups.module#GroupsModule',
    data: { 
      preload:false, 
      delay:100000,
    }   
  },
  /// News feed 
  { 
    path:'news_feed' , 
    loadChildren:'./news-feed/news-feed.module#NewsFeedModule',
    data: { 
      preload:false,
      delay:5000
    }   
  },
  /// Calendar 
  // { 
  //   path:'calendar' , 
  //   loadChildren:'./calendar/calendar.module#CalendarModule',
  //   data: { 
  //     preload:false,
  //     delay:500000,
  //   }   
  // },
  /// Service 
  { 
    path:'services' , 
    loadChildren:'./services/services.module#ServicesModule',
    data: { 
      preload:true,
      delay:0
    }   
  },

  //  Career-Center 
  {
    path: 'career_center', 
    loadChildren: './career-center/career-center.module#CareerCenterModule',
    data: {
      preload: true,
      delay: 0
    }
  }, 
  /// Messaging
  {
     path:'messaging' , 
     loadChildren: './messaging/messaging.module#MessagingModule',
     data: { 
       preload:false,
       delay:3000
      }   
  },
// Jobs
  { 
    path:'jobs' , 
    loadChildren:'./jobs/jobs.module#JobsModule',
    data: { 
      preload:false,
      delay:10000
     }  
   },
// Ads
  { 
    path:'ads' , 
    loadChildren:'./ads/ads.module#AdsModule',
    data: { 
      preload:false,
      delay:15000 
    }   
  },
  // Cars
  { 
    path:'cars' , 
    loadChildren:'./cars/cars.module#CarsModule',
    data: { 
      preload:false,
      delay:15000 
    },
       
  },
  // Virtual work
  { 
    path:'virtual_work' , 
    loadChildren:'./virtual-work/virtual-work.module#VirtualWorkModule',
    data: { 
      preload:false,
    },
       
  },
    // Ads services
    { 
      path:'ads-services' , 
      loadChildren:"./ads-services/ads-services.module#AdsServicesModule",
      data: { 
        preload:false,
        delay:15000 
      }   
    },


  // @Temporary 
  { path: "comming_soon/:target", component: CommingSoonComponent },
  // @Temporary
  {
    path:'for-sale',
    loadChildren:"./for-sale/for-sale.module#ForSaleModule",
    data:{
      preload:true,
      delay:0
    }
  },

  
  { path: "**", component: ErrorComponent },
]


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DemoNetworkComponent,
    DemoMessagingComponent,
    DemoJobsUserComponent,
    DemoJobsCompanyComponent,
    DemoAdsComponent,
    DemoDonateComponent,
    ContactComponent,
    ErrorComponent,
    LandingCardComponent
   
  ],
  imports: [         
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    NgbModule,
    MessagingModule,
    ClassifiedAdsModule,
    SharedModule,
    NotificationsModule,
    HelpCenterModule,
    NgMultiSelectDropDownModule.forRoot(),
    // TranslateModule.forChild({}),
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]
      }
    }),
    ShareModule,
    RouterModule.forRoot(appRoutes , {
      useHash:false,
      anchorScrolling:'enabled',
      scrollPositionRestoration:'enabled',
      onSameUrlNavigation:'reload',
      preloadingStrategy: IS_PRODCUTION ?  CustromPreloadStrategyService : PreloadAllModules
    }),
    ReactiveFormsModule.withConfig({
      warnOnNgModelWithFormControl: 'never',
      
    })

  ],
  exports: [
    AppRoutingModule,
    TranslateModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]


})
export class AppModule { }
