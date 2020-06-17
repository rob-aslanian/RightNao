import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkFollowersComponent } from './network-followers.component';

describe('NetworkFollowersComponent', () => {
  let component: NetworkFollowersComponent;
  let fixture: ComponentFixture<NetworkFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
