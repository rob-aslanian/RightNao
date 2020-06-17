import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkippedCandidateComponent } from './skipped-candidate.component';

describe('SkippedCandidateComponent', () => {
  let component: SkippedCandidateComponent;
  let fixture: ComponentFixture<SkippedCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkippedCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkippedCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
