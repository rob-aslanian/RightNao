import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedUnloginHeaderComponent } from './shared-unlogin-header.component';

describe('SharedUnloginHeaderComponent', () => {
  let component: SharedUnloginHeaderComponent;
  let fixture: ComponentFixture<SharedUnloginHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedUnloginHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedUnloginHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
