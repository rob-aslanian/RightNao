import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowNetworkPeopleComponent } from './grow-network-people.component';

describe('GrowNetworkPeopleComponent', () => {
  let component: GrowNetworkPeopleComponent;
  let fixture: ComponentFixture<GrowNetworkPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowNetworkPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowNetworkPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
