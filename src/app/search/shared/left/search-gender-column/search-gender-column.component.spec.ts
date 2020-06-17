import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGenderColumnComponent } from './search-gender-column.component';

describe('SearchGenderColumnComponent', () => {
  let component: SearchGenderColumnComponent;
  let fixture: ComponentFixture<SearchGenderColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchGenderColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGenderColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
