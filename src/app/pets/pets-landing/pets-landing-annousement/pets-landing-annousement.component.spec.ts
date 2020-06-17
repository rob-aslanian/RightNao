import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsLandingAnnousementComponent } from './pets-landing-annousement.component';

describe('PetsLandingAnnousementComponent', () => {
  let component: PetsLandingAnnousementComponent;
  let fixture: ComponentFixture<PetsLandingAnnousementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsLandingAnnousementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsLandingAnnousementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
