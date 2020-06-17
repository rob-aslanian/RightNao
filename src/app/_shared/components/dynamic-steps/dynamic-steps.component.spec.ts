import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicStepsComponent } from './dynamic-steps.component';

describe('DynamicStepsComponent', () => {
  let component: DynamicStepsComponent;
  let fixture: ComponentFixture<DynamicStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
