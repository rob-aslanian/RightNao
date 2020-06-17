import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFeildOfStudyColumnComponent } from './search-feild-of-study-column.component';

describe('SearchFeildOfStudyColumnComponent', () => {
  let component: SearchFeildOfStudyColumnComponent;
  let fixture: ComponentFixture<SearchFeildOfStudyColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFeildOfStudyColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFeildOfStudyColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
