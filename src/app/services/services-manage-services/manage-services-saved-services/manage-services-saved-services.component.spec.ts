import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServicesSavedServicesComponent } from './manage-services-saved-services.component';

describe('ManageServicesSavedServicesComponent', () => {
  let component: ManageServicesSavedServicesComponent;
  let fixture: ComponentFixture<ManageServicesSavedServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageServicesSavedServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageServicesSavedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
