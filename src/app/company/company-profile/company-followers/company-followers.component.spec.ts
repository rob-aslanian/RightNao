import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFollowersComponent } from './company-followers.component';

describe('CompanyFollowersComponent', () => {
  let component: CompanyFollowersComponent;
  let fixture: ComponentFixture<CompanyFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
