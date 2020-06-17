import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoJobsUserComponent } from './demo-jobs-user.component';

describe('DemoJobsUserComponent', () => {
  let component: DemoJobsUserComponent;
  let fixture: ComponentFixture<DemoJobsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoJobsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoJobsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
