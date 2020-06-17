import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAgeColumnComponent } from './search-age-column.component';

describe('SearchAgeColumnComponent', () => {
  let component: SearchAgeColumnComponent;
  let fixture: ComponentFixture<SearchAgeColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAgeColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAgeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
