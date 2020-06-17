import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailedComponent } from './service-detailed.component';

describe('ServiceDetailedComponent', () => {
  let component: ServiceDetailedComponent;
  let fixture: ComponentFixture<ServiceDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
