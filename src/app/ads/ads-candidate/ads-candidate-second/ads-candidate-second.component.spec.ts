import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsCandidateSecondComponent } from './ads-candidate-second.component';

describe('AdsCandidateSecondComponent', () => {
  let component: AdsCandidateSecondComponent;
  let fixture: ComponentFixture<AdsCandidateSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsCandidateSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsCandidateSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
