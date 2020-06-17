import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCityColumnComponent } from './search-city-column.component';

describe('SearchCityColumnComponent', () => {
  let component: SearchCityColumnComponent;
  let fixture: ComponentFixture<SearchCityColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCityColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCityColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
