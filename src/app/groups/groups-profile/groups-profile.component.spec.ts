import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsProfileComponent } from './groups-profile.component';

describe('GroupsProfileComponent', () => {
  let component: GroupsProfileComponent;
  let fixture: ComponentFixture<GroupsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
