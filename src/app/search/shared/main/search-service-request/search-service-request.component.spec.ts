import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchServiceRequestComponent } from './search-service-request.component';

describe('SearchServiceRequestComponent', () => {
  let component: SearchServiceRequestComponent;
  let fixture: ComponentFixture<SearchServiceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchServiceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchServiceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
