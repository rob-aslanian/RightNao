import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeaderFiltersComponent } from './app-header-filters.component';

describe('AppHeaderFiltersComponent', () => {
  let component: AppHeaderFiltersComponent;
  let fixture: ComponentFixture<AppHeaderFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHeaderFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHeaderFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
