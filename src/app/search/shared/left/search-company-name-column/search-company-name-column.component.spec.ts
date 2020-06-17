import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCompanyNameColumnComponent } from './search-company-name-column.component';

describe('SearchCompanyNameColumnComponent', () => {
  let component: SearchCompanyNameColumnComponent;
  let fixture: ComponentFixture<SearchCompanyNameColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCompanyNameColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCompanyNameColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
