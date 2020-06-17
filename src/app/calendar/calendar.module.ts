import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { CalendarLeftComponent } from './calendar-left/calendar-left.component';
import { MyCalendarsComponent } from './calendar-left/my-calendars/my-calendars.component';
import { OtherCalendarsComponent } from './calendar-left/other-calendars/other-calendars.component';
import { CalendarMainComponent } from './calendar-main/calendar-main.component';
import { CalendarHeaderComponent } from './calendar-main/calendar-header/calendar-header.component';
import { CalendarBodyComponent } from './calendar-main/calendar-body/calendar-body.component';
import { CalendarRightComponent } from './calendar-main/calendar-right/calendar-right.component';
import { CalendarEventsComponent } from './calendar-main/calendar-right/calendar-events/calendar-events.component';
import { CalendarEventCardComponent } from './calendar-main/calendar-right/calendar-events/calendar-event-card/calendar-event-card.component';
import { CalendarTasksComponent } from './calendar-main/calendar-right/calendar-tasks/calendar-tasks.component';
import { AddCalendarModalComponent } from './calendar-left/add-calendar-modal/add-calendar-modal.component';
import { SharedModule } from '../_shared/shared.module';
import { CalendarMainHeaderComponent } from './calendar-main-header/calendar-main-header.component';
import { NgbPopoverModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarSharedComponent } from './calendar-shared/calendar-shared.component';
import { TaskPopoverComponent } from './calendar-shared/popovers/task-popover/task-popover.component';
import { EventPopoverComponent } from './calendar-shared/popovers/event-popover/event-popover.component';
import { AddEventModalComponent } from './calendar-main/modals/add-event-modal/add-event-modal.component';
import { RepeatModalComponent } from './calendar-main/modals/add-event-modal/repeat-modal/repeat-modal.component';
import { TimezoneModalComponent } from './calendar-main/modals/add-event-modal/timezone-modal/timezone-modal.component';
import { AddEventPopoverComponent } from './calendar-shared/popovers/add-event-popover/add-event-popover.component';
import { AddTaskPopoverComponent } from './calendar-shared/popovers/add-task-popover/add-task-popover.component';
import { CreatePollModalComponent } from './calendar-main/modals/create-poll-modal/create-poll-modal.component';
import { PollModalComponent } from './calendar-main/modals/poll-modal/poll-modal.component';
import { CalendarNotificationsComponent } from './calendar-notifications/calendar-notifications.component';

@NgModule({
  declarations: [
    CalendarComponent, 
    CalendarLeftComponent, 
    MyCalendarsComponent, 
    OtherCalendarsComponent, 
    CalendarMainComponent, 
    CalendarHeaderComponent, 
    CalendarBodyComponent, 
    CalendarRightComponent, 
    CalendarEventsComponent, 
    CalendarEventCardComponent, 
    CalendarTasksComponent, 
    AddCalendarModalComponent,
     CalendarMainHeaderComponent,
     CalendarSharedComponent,
     TaskPopoverComponent,
     EventPopoverComponent,
     AddEventModalComponent,
     RepeatModalComponent,
     TimezoneModalComponent,
     AddEventPopoverComponent,
     AddTaskPopoverComponent,
     CreatePollModalComponent,
     PollModalComponent,
     CalendarNotificationsComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    NgbModule,
    NgbPopoverModule, NgbDropdownModule
  ]
})
export class CalendarModule { }
