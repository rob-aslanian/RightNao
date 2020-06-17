import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusHomeComponent } from './status-home.component';

describe('StatusHomeComponent', () => {
  let component: StatusHomeComponent;
  let fixture: ComponentFixture<StatusHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
