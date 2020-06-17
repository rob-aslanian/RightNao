import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeReviewComponent } from './office-review.component';

describe('OfficeReviewComponent', () => {
  let component: OfficeReviewComponent;
  let fixture: ComponentFixture<OfficeReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
