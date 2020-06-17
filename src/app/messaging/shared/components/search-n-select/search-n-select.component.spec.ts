import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNSelectComponent } from './search-n-select.component';

describe('SearchNSelectComponent', () => {
  let component: SearchNSelectComponent;
  let fixture: ComponentFixture<SearchNSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
