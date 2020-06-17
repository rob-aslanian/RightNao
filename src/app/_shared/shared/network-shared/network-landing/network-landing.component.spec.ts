import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkLandingComponent } from './network-landing.component';

describe('NetworkLandingComponent', () => {
  let component: NetworkLandingComponent;
  let fixture: ComponentFixture<NetworkLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
