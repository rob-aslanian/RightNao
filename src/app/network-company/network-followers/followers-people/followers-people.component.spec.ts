import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersPeopleComponent } from './followers-people.component';

describe('FollowersPeopleComponent', () => {
  let component: FollowersPeopleComponent;
  let fixture: ComponentFixture<FollowersPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowersPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
