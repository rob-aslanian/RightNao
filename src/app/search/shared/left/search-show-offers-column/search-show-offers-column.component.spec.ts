import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchShowOffersColumnComponent } from './search-show-offers-column.component';

describe('SearchShowOffersColumnComponent', () => {
  let component: SearchShowOffersColumnComponent;
  let fixture: ComponentFixture<SearchShowOffersColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchShowOffersColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchShowOffersColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
