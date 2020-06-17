import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsSpotlightComponent } from './ads-spotlight.component';

describe('AdsSpotlightComponent', () => {
  let component: AdsSpotlightComponent;
  let fixture: ComponentFixture<AdsSpotlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsSpotlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsSpotlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
