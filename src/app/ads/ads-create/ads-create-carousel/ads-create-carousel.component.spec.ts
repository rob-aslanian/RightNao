import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCreateCarouselComponent } from './ads-create-carousel.component';

describe('AdsCreateCarouselComponent', () => {
  let component: AdsCreateCarouselComponent;
  let fixture: ComponentFixture<AdsCreateCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsCreateCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCreateCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
