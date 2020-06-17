import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOccupationColumnComponent } from './search-occupation-column.component';

describe('SearchOccupationColumnComponent', () => {
  let component: SearchOccupationColumnComponent;
  let fixture: ComponentFixture<SearchOccupationColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOccupationColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOccupationColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
