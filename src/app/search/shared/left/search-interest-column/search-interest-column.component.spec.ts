import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInterestColumnComponent } from './search-interest-column.component';

describe('SearchInterestColumnComponent', () => {
  let component: SearchInterestColumnComponent;
  let fixture: ComponentFixture<SearchInterestColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInterestColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInterestColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
