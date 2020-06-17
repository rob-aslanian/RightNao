import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDatePostedColumnComponent } from './search-date-posted-column.component';

describe('SearchDatePostedColumnComponent', () => {
  let component: SearchDatePostedColumnComponent;
  let fixture: ComponentFixture<SearchDatePostedColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDatePostedColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDatePostedColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
