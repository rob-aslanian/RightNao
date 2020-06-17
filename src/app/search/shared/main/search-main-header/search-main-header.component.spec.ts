import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMainHeaderComponent } from './search-main-header.component';

describe('SearchMainHeaderComponent', () => {
  let component: SearchMainHeaderComponent;
  let fixture: ComponentFixture<SearchMainHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMainHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMainHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
