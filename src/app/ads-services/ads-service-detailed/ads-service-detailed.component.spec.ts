import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsServiceDetailedComponent } from './ads-service-detailed.component';

describe('AdsServiceDetailedComponent', () => {
  let component: AdsServiceDetailedComponent;
  let fixture: ComponentFixture<AdsServiceDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsServiceDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsServiceDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
