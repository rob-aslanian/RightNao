import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestBoxDetailedComponent } from './service-request-box-detailed.component';

describe('ServiceRequestBoxDetailedComponent', () => {
  let component: ServiceRequestBoxDetailedComponent;
  let fixture: ComponentFixture<ServiceRequestBoxDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestBoxDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestBoxDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
