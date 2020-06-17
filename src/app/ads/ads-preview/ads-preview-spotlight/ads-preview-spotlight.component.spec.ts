import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsPreviewSpotlightComponent } from './ads-preview-spotlight.component';

describe('AdsPreviewSpotlightComponent', () => {
  let component: AdsPreviewSpotlightComponent;
  let fixture: ComponentFixture<AdsPreviewSpotlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsPreviewSpotlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsPreviewSpotlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
