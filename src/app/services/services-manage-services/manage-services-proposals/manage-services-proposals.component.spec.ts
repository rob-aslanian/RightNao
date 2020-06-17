import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServicesProposalsComponent } from './manage-services-proposals.component';

describe('ManageServicesProposalsComponent', () => {
  let component: ManageServicesProposalsComponent;
  let fixture: ComponentFixture<ManageServicesProposalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageServicesProposalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageServicesProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
