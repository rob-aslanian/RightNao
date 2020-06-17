import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNameColumnComponent } from './search-name-column.component';

describe('SearchNameColumnComponent', () => {
  let component: SearchNameColumnComponent;
  let fixture: ComponentFixture<SearchNameColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNameColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNameColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
