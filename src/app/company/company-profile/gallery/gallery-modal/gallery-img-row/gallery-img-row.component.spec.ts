import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryImgRowComponent } from './gallery-img-row.component';

describe('GalleryImgRowComponent', () => {
  let component: GalleryImgRowComponent;
  let fixture: ComponentFixture<GalleryImgRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryImgRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryImgRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
