import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRealEstateContentComponent } from './search-real-estate-content.component';

describe('SearchRealEstateContentComponent', () => {
  let component: SearchRealEstateContentComponent;
  let fixture: ComponentFixture<SearchRealEstateContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRealEstateContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRealEstateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
