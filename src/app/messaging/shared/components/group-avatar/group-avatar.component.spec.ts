import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAvatarComponent } from './group-avatar.component';

describe('GroupAvatarComponent', () => {
  let component: GroupAvatarComponent;
  let fixture: ComponentFixture<GroupAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
