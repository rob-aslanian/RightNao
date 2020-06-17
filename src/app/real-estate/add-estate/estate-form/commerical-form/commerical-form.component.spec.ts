import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommericalFormComponent } from './commerical-form.component';

describe('CommericalFormComponent', () => {
  let component: CommericalFormComponent;
  let fixture: ComponentFixture<CommericalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommericalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommericalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
