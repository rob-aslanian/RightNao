import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSchoolColumnComponent } from './search-school-column.component';

describe('SearchSchoolColumnComponent', () => {
  let component: SearchSchoolColumnComponent;
  let fixture: ComponentFixture<SearchSchoolColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSchoolColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSchoolColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
