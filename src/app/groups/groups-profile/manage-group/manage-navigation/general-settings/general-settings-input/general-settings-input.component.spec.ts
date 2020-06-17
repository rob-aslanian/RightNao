import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSettingsInputComponent } from './general-settings-input.component';

describe('GeneralSettingsInputComponent', () => {
  let component: GeneralSettingsInputComponent;
  let fixture: ComponentFixture<GeneralSettingsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSettingsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSettingsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
