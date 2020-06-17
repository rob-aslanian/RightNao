import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServicesRequestsComponent } from './manage-services-requests.component';

describe('ManageServicesRequestsComponent', () => {
  let component: ManageServicesRequestsComponent;
  let fixture: ComponentFixture<ManageServicesRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageServicesRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageServicesRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
