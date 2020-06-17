import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceSliderEditionTwoComponent } from './service-slider-edition-two.component';

describe('ServiceSliderEditionTwoComponent', () => {
  let component: ServiceSliderEditionTwoComponent;
  let fixture: ComponentFixture<ServiceSliderEditionTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSliderEditionTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSliderEditionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
