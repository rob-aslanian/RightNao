


import { VirtualWorkRoutingModule } from './virtual-work-routing.module';
import { VirtualWorkComponent } from './virtual-work.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [VirtualWorkComponent, TestComponent],
  imports: [
    CommonModule,
    VirtualWorkRoutingModule
  ]
})
export class VirtualWorkModule { }
