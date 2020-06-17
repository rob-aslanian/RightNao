import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesManageServicesComponent } from './services-manage-services.component';

describe('ServicesManageServicesComponent', () => {
  let component: ServicesManageServicesComponent;
  let fixture: ComponentFixture<ServicesManageServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesManageServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesManageServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
