import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAllTitleComponent } from './search-all-title.component';

describe('SearchAllTitleComponent', () => {
  let component: SearchAllTitleComponent;
  let fixture: ComponentFixture<SearchAllTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAllTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAllTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
