import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCareerCenterComponent } from './open-career-center.component';

describe('OpenCareerCenterComponent', () => {
  let component: OpenCareerCenterComponent;
  let fixture: ComponentFixture<OpenCareerCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenCareerCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCareerCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
