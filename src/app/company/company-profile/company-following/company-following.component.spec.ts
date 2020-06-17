import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFollowingComponent } from './company-following.component';

describe('CompanyFollowingComponent', () => {
  let component: CompanyFollowingComponent;
  let fixture: ComponentFixture<CompanyFollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFollowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
