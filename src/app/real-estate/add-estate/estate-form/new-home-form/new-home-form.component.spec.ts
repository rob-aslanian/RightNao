import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHomeFormComponent } from './new-home-form.component';

describe('NewHomeFormComponent', () => {
  let component: NewHomeFormComponent;
  let fixture: ComponentFixture<NewHomeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHomeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
