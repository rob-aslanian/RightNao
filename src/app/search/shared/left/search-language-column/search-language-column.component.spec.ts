import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLanguageColumnComponent } from './search-language-column.component';

describe('SearchLanguageColumnComponent', () => {
  let component: SearchLanguageColumnComponent;
  let fixture: ComponentFixture<SearchLanguageColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLanguageColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLanguageColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
