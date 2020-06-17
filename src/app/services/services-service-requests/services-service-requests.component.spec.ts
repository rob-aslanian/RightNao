import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesServiceRequestsComponent } from './services-service-requests.component';

describe('ServicesServiceRequestsComponent', () => {
  let component: ServicesServiceRequestsComponent;
  let fixture: ComponentFixture<ServicesServiceRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesServiceRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesServiceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
