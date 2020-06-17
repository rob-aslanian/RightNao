import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCareerComponent } from './user-career.component';

describe('UserCareerComponent', () => {
  let component: UserCareerComponent;
  let fixture: ComponentFixture<UserCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
