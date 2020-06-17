import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateLandingComponent } from './estate-landing.component';

describe('EstateLandingComponent', () => {
  let component: EstateLandingComponent;
  let fixture: ComponentFixture<EstateLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
