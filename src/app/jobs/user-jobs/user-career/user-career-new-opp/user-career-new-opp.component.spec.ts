import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCareerNewOppComponent } from './user-career-new-opp.component';

describe('UserCareerNewOppComponent', () => {
  let component: UserCareerNewOppComponent;
  let fixture: ComponentFixture<UserCareerNewOppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCareerNewOppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCareerNewOppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
