import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRealEstateComponent } from './search-real-estate.component';

describe('SearchRealEstateComponent', () => {
  let component: SearchRealEstateComponent;
  let fixture: ComponentFixture<SearchRealEstateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRealEstateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRealEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
