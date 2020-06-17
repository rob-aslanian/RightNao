import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateLandingAnnouncementsComponent } from './estate-landing-announcements.component';

describe('EstateLandingAnnouncementsComponent', () => {
  let component: EstateLandingAnnouncementsComponent;
  let fixture: ComponentFixture<EstateLandingAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateLandingAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateLandingAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
