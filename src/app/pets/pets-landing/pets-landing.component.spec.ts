import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsLandingComponent } from './pets-landing.component';

describe('PetsLandingComponent', () => {
  let component: PetsLandingComponent;
  let fixture: ComponentFixture<PetsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
