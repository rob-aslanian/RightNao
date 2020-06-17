import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdsServicesComponent } from './manage-ads-services.component';

describe('ManageAdsServicesComponent', () => {
  let component: ManageAdsServicesComponent;
  let fixture: ComponentFixture<ManageAdsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAdsServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
