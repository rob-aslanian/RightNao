import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowNetworkCompaniesComponent } from './grow-network-companies.component';

describe('GrowNetworkCompaniesComponent', () => {
  let component: GrowNetworkCompaniesComponent;
  let fixture: ComponentFixture<GrowNetworkCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowNetworkCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowNetworkCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
