import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReviewServiceComponent } from './write-review-service.component';

describe('WriteReviewServiceComponent', () => {
  let component: WriteReviewServiceComponent;
  let fixture: ComponentFixture<WriteReviewServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteReviewServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteReviewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
