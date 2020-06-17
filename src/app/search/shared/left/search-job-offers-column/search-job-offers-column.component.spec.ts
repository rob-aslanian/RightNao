import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobOffersColumnComponent } from './search-job-offers-column.component';

describe('SearchJobOffersColumnComponent', () => {
  let component: SearchJobOffersColumnComponent;
  let fixture: ComponentFixture<SearchJobOffersColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchJobOffersColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobOffersColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
