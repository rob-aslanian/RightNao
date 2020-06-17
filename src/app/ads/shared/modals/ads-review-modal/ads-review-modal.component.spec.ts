import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsReviewModalComponent } from './ads-review-modal.component';

describe('AdsReviewModalComponent', () => {
  let component: AdsReviewModalComponent;
  let fixture: ComponentFixture<AdsReviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsReviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
