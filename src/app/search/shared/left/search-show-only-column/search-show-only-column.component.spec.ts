import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchShowOnlyColumnComponent } from './search-show-only-column.component';

describe('SearchShowOnlyColumnComponent', () => {
  let component: SearchShowOnlyColumnComponent;
  let fixture: ComponentFixture<SearchShowOnlyColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchShowOnlyColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchShowOnlyColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
