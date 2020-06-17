import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServicesOrdersComponent } from './manage-services-orders.component';

describe('ManageServicesOrdersComponent', () => {
  let component: ManageServicesOrdersComponent;
  let fixture: ComponentFixture<ManageServicesOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageServicesOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageServicesOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
