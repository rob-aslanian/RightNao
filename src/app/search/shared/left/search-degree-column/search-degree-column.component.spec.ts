import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDegreeColumnComponent } from './search-degree-column.component';

describe('SearchDegreeColumnComponent', () => {
  let component: SearchDegreeColumnComponent;
  let fixture: ComponentFixture<SearchDegreeColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDegreeColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDegreeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
