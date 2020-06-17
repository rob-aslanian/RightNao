import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkGeneralComponent } from './network-general.component';

describe('NetworkGeneralComponent', () => {
  let component: NetworkGeneralComponent;
  let fixture: ComponentFixture<NetworkGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
