import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecsFormComponent } from './specs-form.component';

describe('SpecsFormComponent', () => {
  let component: SpecsFormComponent;
  let fixture: ComponentFixture<SpecsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
