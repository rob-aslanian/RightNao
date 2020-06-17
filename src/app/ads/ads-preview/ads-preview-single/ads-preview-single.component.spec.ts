import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsPreviewSingleComponent } from './ads-preview-single.component';

describe('AdsPreviewSingleComponent', () => {
  let component: AdsPreviewSingleComponent;
  let fixture: ComponentFixture<AdsPreviewSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsPreviewSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsPreviewSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
