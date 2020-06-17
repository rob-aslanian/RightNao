import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchServiceDetailedComponent } from './search-service-detailed.component';

describe('SearchServiceDetailedComponent', () => {
  let component: SearchServiceDetailedComponent;
  let fixture: ComponentFixture<SearchServiceDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchServiceDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchServiceDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
