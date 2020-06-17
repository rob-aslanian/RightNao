import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWorkingHoursComponent } from './search-working-hours.component';

describe('SearchWorkingHoursComponent', () => {
  let component: SearchWorkingHoursComponent;
  let fixture: ComponentFixture<SearchWorkingHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWorkingHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWorkingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
