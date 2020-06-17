import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersCompaniesComponent } from './followers-companies.component';

describe('FollowersCompaniesComponent', () => {
  let component: FollowersCompaniesComponent;
  let fixture: ComponentFixture<FollowersCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowersCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
