import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAccountNotificationsComponent } from './company-account-notifications.component';

describe('CompanyAccountNotificationsComponent', () => {
  let component: CompanyAccountNotificationsComponent;
  let fixture: ComponentFixture<CompanyAccountNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAccountNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAccountNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
