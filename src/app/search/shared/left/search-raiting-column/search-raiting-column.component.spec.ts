import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRaitingColumnComponent } from './search-raiting-column.component';

describe('SearchRaitingColumnComponent', () => {
  let component: SearchRaitingColumnComponent;
  let fixture: ComponentFixture<SearchRaitingColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRaitingColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRaitingColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
