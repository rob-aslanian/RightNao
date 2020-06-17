import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioHomeComponent } from './radio-home.component';

describe('RadioHomeComponent', () => {
  let component: RadioHomeComponent;
  let fixture: ComponentFixture<RadioHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
