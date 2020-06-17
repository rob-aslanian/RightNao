import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGroupsComponent } from './register-groups.component';

describe('RegisterGroupsComponent', () => {
  let component: RegisterGroupsComponent;
  let fixture: ComponentFixture<RegisterGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
