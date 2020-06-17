import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCheckboxColumnComponent } from './search-checkbox-column.component';

describe('SearchCheckboxColumnComponent', () => {
  let component: SearchCheckboxColumnComponent;
  let fixture: ComponentFixture<SearchCheckboxColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCheckboxColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCheckboxColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
