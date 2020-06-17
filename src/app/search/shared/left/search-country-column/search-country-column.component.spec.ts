import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCountryColumnComponent } from './search-country-column.component';

describe('SearchCountryColumnComponent', () => {
  let component: SearchCountryColumnComponent;
  let fixture: ComponentFixture<SearchCountryColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCountryColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCountryColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
