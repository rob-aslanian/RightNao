import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsHeaderComponent } from './groups-header.component';

describe('GroupsHeaderComponent', () => {
  let component: GroupsHeaderComponent;
  let fixture: ComponentFixture<GroupsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
