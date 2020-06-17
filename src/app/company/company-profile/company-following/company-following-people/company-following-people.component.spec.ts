import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFollowingPeopleComponent } from './company-following-people.component';

describe('CompanyFollowingPeopleComponent', () => {
  let component: CompanyFollowingPeopleComponent;
  let fixture: ComponentFixture<CompanyFollowingPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFollowingPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFollowingPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
