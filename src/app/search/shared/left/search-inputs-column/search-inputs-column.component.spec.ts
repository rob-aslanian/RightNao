import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInputsColumnComponent } from './search-inputs-column.component';

describe('SearchInputsColumnComponent', () => {
  let component: SearchInputsColumnComponent;
  let fixture: ComponentFixture<SearchInputsColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInputsColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputsColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
