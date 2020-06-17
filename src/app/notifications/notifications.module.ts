import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationsComponent } from "./notifications.component";
import { NotifyService } from "./notify.service";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../_shared/shared.module";


const routes : Routes = [
  { path:'all-nottification'  , component:NotificationsComponent}
]

@NgModule({
  declarations: [
    NotificationsComponent,
  ],
  imports: [
     CommonModule,
     SharedModule,
     RouterModule.forChild(routes), 

  ],
  providers: [{ provide: NotifyService, useClass: NotifyService }],

})
export class NotificationsModule {}
