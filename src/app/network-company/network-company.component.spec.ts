import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkCompanyComponent } from './network-company.component';

describe('NetworkCompanyComponent', () => {
  let component: NetworkCompanyComponent;
  let fixture: ComponentFixture<NetworkCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
