import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRadioColumnComponent } from './search-radio-column.component';

describe('SearchRadioColumnComponent', () => {
  let component: SearchRadioColumnComponent;
  let fixture: ComponentFixture<SearchRadioColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRadioColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRadioColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
