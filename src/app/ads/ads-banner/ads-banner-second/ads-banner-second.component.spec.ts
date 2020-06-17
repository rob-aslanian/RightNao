import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsBannerSecondComponent } from './ads-banner-second.component';

describe('AdsBannerSecondComponent', () => {
  let component: AdsBannerSecondComponent;
  let fixture: ComponentFixture<AdsBannerSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsBannerSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsBannerSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
