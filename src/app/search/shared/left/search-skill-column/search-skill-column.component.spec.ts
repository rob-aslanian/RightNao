import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSkillColumnComponent } from './search-skill-column.component';

describe('SearchSkillColumnComponent', () => {
  let component: SearchSkillColumnComponent;
  let fixture: ComponentFixture<SearchSkillColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSkillColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSkillColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
