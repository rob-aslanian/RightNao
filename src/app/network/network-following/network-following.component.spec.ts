import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkFollowingComponent } from './network-following.component';

describe('NetworkFollowingComponent', () => {
  let component: NetworkFollowingComponent;
  let fixture: ComponentFixture<NetworkFollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkFollowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
