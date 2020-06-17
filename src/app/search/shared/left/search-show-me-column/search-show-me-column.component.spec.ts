import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchShowMeColumnComponent } from './search-show-me-column.component';

describe('SearchShowMeColumnComponent', () => {
  let component: SearchShowMeColumnComponent;
  let fixture: ComponentFixture<SearchShowMeColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchShowMeColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchShowMeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
