import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSliderComponent } from './box-slider.component';

describe('BoxSliderComponent', () => {
  let component: BoxSliderComponent;
  let fixture: ComponentFixture<BoxSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
