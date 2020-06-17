import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCareerEditComponent } from './user-career-edit.component';

describe('UserCareerEditComponent', () => {
  let component: UserCareerEditComponent;
  let fixture: ComponentFixture<UserCareerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCareerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCareerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
