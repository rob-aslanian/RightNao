import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsPreviewResponsiveComponent } from './ads-preview-responsive.component';

describe('AdsPreviewResponsiveComponent', () => {
  let component: AdsPreviewResponsiveComponent;
  let fixture: ComponentFixture<AdsPreviewResponsiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsPreviewResponsiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsPreviewResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
