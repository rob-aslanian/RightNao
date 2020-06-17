import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProjectTypeComponent } from './search-project-type.component';

describe('SearchProjectTypeComponent', () => {
  let component: SearchProjectTypeComponent;
  let fixture: ComponentFixture<SearchProjectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProjectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
