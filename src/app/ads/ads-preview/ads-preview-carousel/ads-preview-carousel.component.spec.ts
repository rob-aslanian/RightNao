import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsPreviewCarouselComponent } from './ads-preview-carousel.component';

describe('AdsPreviewCarouselComponent', () => {
  let component: AdsPreviewCarouselComponent;
  let fixture: ComponentFixture<AdsPreviewCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsPreviewCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsPreviewCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
