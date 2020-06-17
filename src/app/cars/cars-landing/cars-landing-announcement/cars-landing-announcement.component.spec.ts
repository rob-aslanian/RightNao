import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsLandingAnnouncementComponent } from './cars-landing-announcement.component';

describe('CarsLandingAnnouncementComponent', () => {
  let component: CarsLandingAnnouncementComponent;
  let fixture: ComponentFixture<CarsLandingAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsLandingAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsLandingAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
