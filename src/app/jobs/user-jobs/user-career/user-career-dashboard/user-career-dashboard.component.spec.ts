import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCareerDashboardComponent } from './user-career-dashboard.component';

describe('UserCareerDashboardComponent', () => {
  let component: UserCareerDashboardComponent;
  let fixture: ComponentFixture<UserCareerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCareerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCareerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
