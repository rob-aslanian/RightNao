import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderBadBoyEditionComponent } from './slider-bad-boy-edition.component';

describe('SliderBadBoyEditionComponent', () => {
  let component: SliderBadBoyEditionComponent;
  let fixture: ComponentFixture<SliderBadBoyEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderBadBoyEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderBadBoyEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
