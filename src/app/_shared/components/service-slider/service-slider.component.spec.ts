import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSliderComponent } from './service-slider.component';

describe('ServiceSliderComponent', () => {
  let component: ServiceSliderComponent;
  let fixture: ComponentFixture<ServiceSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
