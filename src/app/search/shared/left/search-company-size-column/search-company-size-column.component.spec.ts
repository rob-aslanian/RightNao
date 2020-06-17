import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCompanySizeColumnComponent } from './search-company-size-column.component';

describe('SearchCompanySizeColumnComponent', () => {
  let component: SearchCompanySizeColumnComponent;
  let fixture: ComponentFixture<SearchCompanySizeColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCompanySizeColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCompanySizeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
