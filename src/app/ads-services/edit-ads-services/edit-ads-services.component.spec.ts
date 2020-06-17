import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdsServicesComponent } from './edit-ads-services.component';

describe('EditAdsServicesComponent', () => {
  let component: EditAdsServicesComponent;
  let fixture: ComponentFixture<EditAdsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAdsServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
