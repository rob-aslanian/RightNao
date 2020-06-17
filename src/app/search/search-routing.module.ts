import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { SearchMainComponent } from './search-main/search-main.component';
import { SearchDashboardComponent } from './search-dashboard/search-dashboard.component';


const routes: Routes = [
  { path:'' , component:SearchComponent , children:[
    { path:'' , component:SearchDashboardComponent },
    { path:'all' , component:SearchMainComponent ,              data:{ type: 'all' } },
    { path:'people' , component:SearchMainComponent ,           data:{ type: 'people' } },
    { path:'company' , component:SearchMainComponent ,          data:{ type: 'company' } },
    { path:'professional' , component:SearchMainComponent ,     data:{ type: 'professional' } },
    { path:'group' , component:SearchMainComponent ,            data:{ type: 'group' } },
    { path:'candidate' , component:SearchMainComponent ,        data:{ type: 'candidate' } },
    { path:'job' , component:SearchMainComponent ,              data:{ type: 'job' } },
    { path:'service' , component:SearchMainComponent ,          data:{ type: 'service' } },
    { path:'service_request' , component:SearchMainComponent ,  data:{ type: 'service_request' } },
    { path:'real_estate' , component:SearchMainComponent ,      data:{ type: 'real_estate' } },

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
