import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchKeywordComponent } from './search-keyword.component';

describe('SearchKeywordComponent', () => {
  let component: SearchKeywordComponent;
  let fixture: ComponentFixture<SearchKeywordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchKeywordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchKeywordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
