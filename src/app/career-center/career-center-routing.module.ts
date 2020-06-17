import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareerCenterComponent } from './career-center.component';
import { CareerForComapnyComponent } from './career-for-comapny/career-for-comapny.component';
import { CareerForUserComponent } from './career-for-user/career-for-user.component';
import { OpenCareerCenterComponent } from './career-for-comapny/open-career-center/open-career-center.component';
import { MyCenterComponent } from './career-for-comapny/my-center/my-center.component';
import { CandidatesComponent } from './career-for-comapny/candidates/candidates.component';


const routes: Routes = [
  { path:'' , component:CareerCenterComponent , children:[
      // Comapny 
      { path:"company" , component:CareerForComapnyComponent , children:[
        { path:"", redirectTo:"my_center" ,  pathMatch:"full" },
        { path:"manage", component:OpenCareerCenterComponent  },
        { path:"my_center", component:MyCenterComponent },
        { path:"my_center/:id", component:MyCenterComponent },
        { path:"candidates", component:CandidatesComponent },
      ]},

      { path:"detail/:id" , component:MyCenterComponent},

       // User 
       { path:"user" , component:CareerForUserComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerCenterRoutingModule { }
