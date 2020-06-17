import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceModalComponent } from './experience-modal.component';

describe('ExperienceModalComponent', () => {
  let component: ExperienceModalComponent;
  let fixture: ComponentFixture<ExperienceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
