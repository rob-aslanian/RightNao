import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCompanyTypeColumnComponent } from './search-company-type-column.component';

describe('SearchCompanyTypeColumnComponent', () => {
  let component: SearchCompanyTypeColumnComponent;
  let fixture: ComponentFixture<SearchCompanyTypeColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCompanyTypeColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCompanyTypeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
