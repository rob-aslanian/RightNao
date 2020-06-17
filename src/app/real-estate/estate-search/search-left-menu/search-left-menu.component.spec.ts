import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLeftMenuComponent } from './search-left-menu.component';

describe('SearchLeftMenuComponent', () => {
  let component: SearchLeftMenuComponent;
  let fixture: ComponentFixture<SearchLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
