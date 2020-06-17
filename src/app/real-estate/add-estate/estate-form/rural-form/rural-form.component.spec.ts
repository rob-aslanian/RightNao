import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuralFormComponent } from './rural-form.component';

describe('RuralFormComponent', () => {
  let component: RuralFormComponent;
  let fixture: ComponentFixture<RuralFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuralFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
