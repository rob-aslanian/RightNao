import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared.module';
 


const COMPONENTS = [
  
];

const ROUTES: Routes = [
  
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    NgbModule, 
    RouterModule.forChild(ROUTES),
    // SharedModule
  ],
  providers : [
  ], 
  exports:COMPONENTS
})
export class UserSharedModule { }
