import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdsServicesComponent } from './add-ads-services.component';

describe('AddAdsServicesComponent', () => {
  let component: AddAdsServicesComponent;
  let fixture: ComponentFixture<AddAdsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdsServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
