import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPhotosComponent } from './shared-photos.component';

describe('SharedPhotosComponent', () => {
  let component: SharedPhotosComponent;
  let fixture: ComponentFixture<SharedPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
