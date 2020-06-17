import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFollowerPeopleComponent } from './company-follower-people.component';

describe('CompanyFollowerPeopleComponent', () => {
  let component: CompanyFollowerPeopleComponent;
  let fixture: ComponentFixture<CompanyFollowerPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFollowerPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFollowerPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
