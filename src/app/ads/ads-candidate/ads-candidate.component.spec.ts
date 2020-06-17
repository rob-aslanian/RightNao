import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCandidateComponent } from './ads-candidate.component';

describe('AdsCandidateComponent', () => {
  let component: AdsCandidateComponent;
  let fixture: ComponentFixture<AdsCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
