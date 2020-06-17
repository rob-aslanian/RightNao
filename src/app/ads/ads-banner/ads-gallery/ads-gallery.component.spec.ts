import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsGalleryComponent } from './ads-gallery.component';

describe('AdsGalleryComponent', () => {
  let component: AdsGalleryComponent;
  let fixture: ComponentFixture<AdsGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
