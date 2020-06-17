import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServicesReviewsComponent } from './manage-services-reviews.component';

describe('ManageServicesReviewsComponent', () => {
  let component: ManageServicesReviewsComponent;
  let fixture: ComponentFixture<ManageServicesReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageServicesReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageServicesReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
