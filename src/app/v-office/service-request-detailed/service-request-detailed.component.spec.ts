import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestDetailedComponent } from './service-request-detailed.component';

describe('ServiceRequestDetailedComponent', () => {
  let component: ServiceRequestDetailedComponent;
  let fixture: ComponentFixture<ServiceRequestDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
