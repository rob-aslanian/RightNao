import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileConnectionsComponent } from './user-profile-connections.component';

describe('UserProfileConnectionsComponent', () => {
  let component: UserProfileConnectionsComponent;
  let fixture: ComponentFixture<UserProfileConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
