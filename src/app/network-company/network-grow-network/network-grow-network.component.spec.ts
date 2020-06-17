import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkGrowNetworkComponent } from './network-grow-network.component';

describe('NetworkGrowNetworkComponent', () => {
  let component: NetworkGrowNetworkComponent;
  let fixture: ComponentFixture<NetworkGrowNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkGrowNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkGrowNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
