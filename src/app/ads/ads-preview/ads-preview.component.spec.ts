import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsPreviewComponent } from './ads-preview.component';

describe('AdsPreviewComponent', () => {
  let component: AdsPreviewComponent;
  let fixture: ComponentFixture<AdsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
