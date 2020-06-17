import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHiringComponent } from './user-hiring.component';

describe('UserHiringComponent', () => {
  let component: UserHiringComponent;
  let fixture: ComponentFixture<UserHiringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHiringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
