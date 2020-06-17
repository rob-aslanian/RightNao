import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedUsersComponent } from './saved-users.component';

describe('SavedUsersComponent', () => {
  let component: SavedUsersComponent;
  let fixture: ComponentFixture<SavedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
