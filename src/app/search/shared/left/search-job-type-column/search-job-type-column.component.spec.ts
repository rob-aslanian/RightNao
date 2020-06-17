import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobTypeColumnComponent } from './search-job-type-column.component';

describe('SearchJobTypeColumnComponent', () => {
  let component: SearchJobTypeColumnComponent;
  let fixture: ComponentFixture<SearchJobTypeColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchJobTypeColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobTypeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
