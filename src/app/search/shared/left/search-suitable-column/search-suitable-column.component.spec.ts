import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSuitableColumnComponent } from './search-suitable-column.component';

describe('SearchSuitableColumnComponent', () => {
  let component: SearchSuitableColumnComponent;
  let fixture: ComponentFixture<SearchSuitableColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSuitableColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSuitableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
