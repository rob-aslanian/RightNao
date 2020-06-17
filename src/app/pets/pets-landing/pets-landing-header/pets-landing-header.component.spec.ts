import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsLandingHeaderComponent } from './pets-landing-header.component';

describe('PetsLandingHeaderComponent', () => {
  let component: PetsLandingHeaderComponent;
  let fixture: ComponentFixture<PetsLandingHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsLandingHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsLandingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
