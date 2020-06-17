import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCandidatesComponent } from './saved-candidates.component';

describe('SavedCandidatesComponent', () => {
  let component: SavedCandidatesComponent;
  let fixture: ComponentFixture<SavedCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedCandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
