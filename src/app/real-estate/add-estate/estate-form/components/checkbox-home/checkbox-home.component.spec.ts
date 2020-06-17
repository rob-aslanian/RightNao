import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxHomeComponent } from './checkbox-home.component';

describe('CheckboxHomeComponent', () => {
  let component: CheckboxHomeComponent;
  let fixture: ComponentFixture<CheckboxHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
