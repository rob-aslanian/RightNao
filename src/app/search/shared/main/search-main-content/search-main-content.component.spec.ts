import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMainContentComponent } from './search-main-content.component';

describe('SearchMainContentComponent', () => {
  let component: SearchMainContentComponent;
  let fixture: ComponentFixture<SearchMainContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMainContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
