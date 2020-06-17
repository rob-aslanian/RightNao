import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkConnectionsComponent } from './network-connections.component';

describe('NetworkConnectionsComponent', () => {
  let component: NetworkConnectionsComponent;
  let fixture: ComponentFixture<NetworkConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
