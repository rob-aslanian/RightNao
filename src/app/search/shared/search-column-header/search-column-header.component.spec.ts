import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchColumnHeaderComponent } from './search-column-header.component';

describe('SearchColumnHeaderComponent', () => {
  let component: SearchColumnHeaderComponent;
  let fixture: ComponentFixture<SearchColumnHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchColumnHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchColumnHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
