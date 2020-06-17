import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSalaryColumnComponent } from './search-salary-column.component';

describe('SearchSalaryColumnComponent', () => {
  let component: SearchSalaryColumnComponent;
  let fixture: ComponentFixture<SearchSalaryColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSalaryColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSalaryColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
