import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIndustryColumnComponent } from './search-industry-column.component';

describe('SearchIndustryColumnComponent', () => {
  let component: SearchIndustryColumnComponent;
  let fixture: ComponentFixture<SearchIndustryColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchIndustryColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIndustryColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
