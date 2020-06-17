import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgreeModalComponent } from './user-agree-modal.component';

describe('UserAgreeModalComponent', () => {
  let component: UserAgreeModalComponent;
  let fixture: ComponentFixture<UserAgreeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAgreeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAgreeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
