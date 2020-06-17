import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobTitleColumnComponent } from './search-job-title-column.component';

describe('SearchJobTitleColumnComponent', () => {
  let component: SearchJobTitleColumnComponent;
  let fixture: ComponentFixture<SearchJobTitleColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchJobTitleColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobTitleColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
