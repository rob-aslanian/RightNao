import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestBoxComponent } from './service-request-box.component';

describe('ServiceRequestBoxComponent', () => {
  let component: ServiceRequestBoxComponent;
  let fixture: ComponentFixture<ServiceRequestBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRequestBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
