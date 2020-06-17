import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobsComponent } from './search-jobs.component';

describe('SearchJobsComponent', () => {
  let component: SearchJobsComponent;
  let fixture: ComponentFixture<SearchJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
