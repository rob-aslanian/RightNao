
import { VirtualWorkComponent } from './virtual-work.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  { path:"" , component:VirtualWorkComponent , children:[
   { path:"test" ,  component:TestComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualWorkRoutingModule { }
