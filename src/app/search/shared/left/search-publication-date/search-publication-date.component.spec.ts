import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPublicationDateComponent } from './search-publication-date.component';

describe('SearchPublicationDateComponent', () => {
  let component: SearchPublicationDateComponent;
  let fixture: ComponentFixture<SearchPublicationDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPublicationDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPublicationDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
