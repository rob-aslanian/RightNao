import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchExperienceColumnComponent } from './search-experience-column.component';

describe('SearchExperienceColumnComponent', () => {
  let component: SearchExperienceColumnComponent;
  let fixture: ComponentFixture<SearchExperienceColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchExperienceColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchExperienceColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
