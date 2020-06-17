import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPractiseYearColumnComponent } from './search-practise-year-column.component';

describe('SearchPractiseYearColumnComponent', () => {
  let component: SearchPractiseYearColumnComponent;
  let fixture: ComponentFixture<SearchPractiseYearColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPractiseYearColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPractiseYearColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
