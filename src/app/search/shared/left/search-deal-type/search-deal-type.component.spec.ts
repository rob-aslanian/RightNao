import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDealTypeComponent } from './search-deal-type.component';

describe('SearchDealTypeComponent', () => {
  let component: SearchDealTypeComponent;
  let fixture: ComponentFixture<SearchDealTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDealTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDealTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
