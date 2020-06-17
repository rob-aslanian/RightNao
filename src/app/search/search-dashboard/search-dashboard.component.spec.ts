import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDashboardComponent } from './search-dashboard.component';

describe('SearchDashboardComponent', () => {
  let component: SearchDashboardComponent;
  let fixture: ComponentFixture<SearchDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
