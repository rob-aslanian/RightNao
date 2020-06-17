import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesMainServicesComponent } from './services-main-services.component';

describe('ServicesMainServicesComponent', () => {
  let component: ServicesMainServicesComponent;
  let fixture: ComponentFixture<ServicesMainServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesMainServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesMainServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
