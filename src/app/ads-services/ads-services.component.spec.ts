import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsServicesComponent } from './ads-services.component';

describe('AdsServicesComponent', () => {
  let component: AdsServicesComponent;
  let fixture: ComponentFixture<AdsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
