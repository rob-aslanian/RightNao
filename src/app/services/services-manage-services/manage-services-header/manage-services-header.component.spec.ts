import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServicesHeaderComponent } from './manage-services-header.component';

describe('ManageServicesHeaderComponent', () => {
  let component: ManageServicesHeaderComponent;
  let fixture: ComponentFixture<ManageServicesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageServicesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageServicesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
