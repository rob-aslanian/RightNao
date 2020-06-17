import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchShowCandidatesColumnComponent } from './search-show-candidates-column.component';

describe('SearchShowCandidatesColumnComponent', () => {
  let component: SearchShowCandidatesColumnComponent;
  let fixture: ComponentFixture<SearchShowCandidatesColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchShowCandidatesColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchShowCandidatesColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
